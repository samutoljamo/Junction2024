from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from enum import Enum
import instructor
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, RedirectResponse
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, Session
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import base64
from typing import Optional, List
import io
from PIL import Image
import os
from datetime import datetime
import time
import uuid

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./items.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

load_dotenv()

# SQLAlchemy Models
class Building(Base):
    __tablename__ = 'buildings'
    id = Column(Integer, primary_key=True)
    location = Column(String)

    items = relationship('Item', back_populates='building')

class ItemType(Base):
    __tablename__ = 'item_types'
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)

    items = relationship('Item', back_populates='type')

class ItemDB(Base):
    __tablename__ = "items"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    x = Column(Integer)
    y = Column(Integer)
    floor = Column(Integer)
    serial_number = Column(String, nullable=True)
    material = Column(String, nullable=True)
    model = Column(String, nullable=True)
    manufacturer = Column(String, nullable=True)
    description = Column(String, nullable=True) # this could be updated based on visits
    manufacturing_year = Column(Integer, nullable=True)
    
    building_id = Column(Integer, ForeignKey('buildings.id'))
    building = relationship('Building', back_populates='items')
    type = relationship('ItemType', back_populates='items')
    visits = relationship("VisitDB", back_populates="item", cascade="all, delete-orphan")


class VisitDB(Base):
    __tablename__ = "visits"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(Integer, default=time.time())
    condition = Column(String)
    notes = Column(String)
    item_id = Column(Integer, ForeignKey("items.id"))

    item = relationship('Item', back_populates='visits')
    pictures = relationship('Picture', back_populates='visit')

class PictureDB(Base):
    __tablename__ = "pictures"
    
    id = Column(Integer, primary_key=True, index=True)
    url = Column(String)
    visit_id = Column(Integer, ForeignKey("visits.id"))
    
    visit = relationship('VisitDB', back_populates='pictures')

# Create tables
Base.metadata.create_all(bind=engine)

# Pydantic models
class PictureBase(BaseModel):
    url: str

class Picture(PictureBase):
    id: int
    item_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class ItemBase(BaseModel):
    name: str
    description: Optional[str] = None

class Item(ItemBase):
    id: int
    pictures: List[Picture] = []
    
    class Config:
        from_attributes = True

class ImageUpload(BaseModel):
    images: List[str]

# FastAPI app setup
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = instructor.from_openai(OpenAI(api_key=os.getenv('OPENAI_API_KEY')))
model = "gpt-4o-mini"

# Mount the images directory to make it accessible
app.mount("/images", StaticFiles(directory="images"), name="images")

# Dependency for database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def save_image(base64_str: str) -> str:
    try:
        if "base64," in base64_str:
            base64_str = base64_str.split("base64,")[1]
            
        image_data = base64.b64decode(base64_str)
        
        filename = f"{uuid.uuid4()}.png"
        os.makedirs("images", exist_ok=True)
        file_path = os.path.join("images", filename)
        
        image = Image.open(io.BytesIO(image_data))
        image.save(file_path)
        
        return f"/images/{filename}"
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image data: {str(e)}")

#Pydantic models for ai analysis
class ItemType(Enum):
    # all the categories that the KONE company has
    structure = "structure"
    ventilation = "ventilation"
    electrical = "electrical"
    plumbing = "plumbing"
    other = "other"


class ItemStructure(BaseModel):
    equipment_name: Optional[str] = Field(description="The name of the equipment", default="")
    equipment_type: ItemType = Field(description="Type of the item", default=ItemType.other)
    manufacturer: Optional[str] = Field(description="The manufacturer of the item", default=None)
    manufacturing_year: Optional[int] = Field(description="The manufacturing year of the item", default=None)
    model: Optional[str] = Field(description="The model of the item", default=None)
    serial_number: Optional[str] = Field(description="The serial number of the device if found", default=None)
    material: Optional[str] = Field(description="The material of the item", default=None)
    surface_condition: Optional[str] = Field(description="The surface condition of the item", default=None)

import base64
import tempfile
from fastapi import HTTPException
from PIL import Image
import io
from pprint import pprint

async def extract_item_info_from_images(base64_str_images: list[str]) -> ItemStructure:
    try:
        for base64_str in base64_str_images:
            if not base64_str.startswith("data:image"):
                base64_str = "data:image/jpeg;base64," + base64_str

        content = []
        pprint(content)
        for base64_str in base64_str_images:
            content.append(
                {
                    "type": "image_url",
                    "image_url": {
                        "url": base64_str
                    }
                }
            )

        item = client.chat.completions.create(
            model=model,
            response_model=ItemStructure,
            messages=[
                {
                    "role": "system",
                    "content": "You are a system that always extracts information from images",
                    "role": "user",
                    "content": content
                }
            ],
        )
        return item
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Vision API error: {str(e)}")


@app.get("/api/pictures", response_model=List[Picture])
async def list_pictures(db: Session = Depends(get_db)):
    pictures = db.query(PictureDB).all()
    return pictures

@app.get("/api/items/{item_id}/pictures", response_model=List[Picture])
async def get_item_pictures(item_id: int, db: Session = Depends(get_db)):
    pictures = db.query(PictureDB).filter(PictureDB.item_id == item_id).all()
    return pictures

@app.post("/create_item")
async def create_item(item: ItemBase, db: Session = Depends(get_db)):
    new_item = ItemDB(**item.dict())
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@app.post("/items/", response_model=Item)
async def create_item(item: ItemBase, db: Session = Depends(get_db)):
    db_item = ItemDB(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.get("/create_new_item")
async def create_new_item(db: Session = Depends(get_db)):
    new_item = ItemDB()
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

class TestModel(BaseModel):
    name: str
    description: str

@app.post("/uploadtest/", response_model=ItemStructure)
async def upload_image():
    try:

        # generate a random base64 image
        image = Image.new('RGB', (100, 100))
        with tempfile.TemporaryFile() as tempf:
            image.save(tempf, format="JPEG")
            tempf.seek(0)
            base64_encoded = base64.b64encode(tempf.read()).decode('utf-8')

        extracted_item = await extract_item_info_from_images([base64_encoded])
        print(extracted_item)

        return extracted_item

    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

@app.post("/upload/", response_model=ItemStructure)
async def upload_image(payload: ImageUpload, db: Session = Depends(get_db)):
    try:

        # extract the item information from the image
        extracted_item = await extract_item_info_from_images(payload.images)
        
        return extracted_item
               
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")


@app.get("/item_ids")
async def get_item_ids(db: Session = Depends(get_db)):
    items = db.query(ItemDB).all()
    return [item.id for item in items]
