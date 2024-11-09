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

from models import *

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./items.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

load_dotenv()

# Create tables
Base.metadata.create_all(bind=engine)

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
class ItemTypeCategory(Enum):
    # all the categories that the KONE company has
    structure = "structure"
    ventilation = "ventilation"
    electrical = "electrical"
    plumbing = "plumbing"
    other = "other"


class ItemStructure(BaseModel):
    equipment_name: Optional[str] = Field(description="The name of the equipment", default="")
    equipment_type: ItemTypeCategory = Field(description="Type of the item", default=ItemTypeCategory.other)
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

def return_example_item():
    return ItemDB(
        name="Grand Piano",
        x=15,
        y=30,
        floor=2,
        serial_number="GP-12345",
        material="Wood",
        model="G-Series",
        manufacturer="Yamaha",
        description="A classic grand piano in excellent condition.",
        manufacturing_year=2010,
        building=BuildingDB(
            id=1,
            location="Concert Hall",
        ),
        type=ItemType(
            id=1,
            name="Musical Instrument"
        ),
        visits=[
            VisitDB(
                id=1,
                timestamp=int(time.time()),
                condition="Good",
                notes="No visible damage.",
                item_id=1,
                pictures=[
                    PictureDB(
                        id=1,
                        url="http://example.com/piano1.jpg",
                        visit_id=1
                    ),
                    PictureDB(
                        id=2,
                        url="http://example.com/piano2.jpg",
                        visit_id=1
                    )
                ]
            ),
            VisitDB(
                id=2,
                timestamp=int(time.time()),
                condition="Needs Tuning",
                notes="Sound is slightly off-key.",
                item_id=1,
                pictures=[
                    PictureDB(
                        id=3,
                        url="http://example.com/piano3.jpg",
                        visit_id=2
                    )
                ]
            )
        ]
    )

# Endpoint that returns the hardcoded item data
@app.get("/item", response_model=ItemBase)
def get_item():
    return return_example_item() 

@app.get("/save_example_item")
async def save_example_item(db: Session = Depends(get_db)):
    item = return_example_item()
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@app.post("/get_all_items_for_given_floor", response_model=ListOfItems)
async def get_all_items(request: FloorRequest, db: Session = Depends(get_db)):
    items = db.query(ItemDB).filter(ItemDB.floor == request.floor_number).all()
    return items 


@app.get("/create_new_item", response_model=ItemBase)
async def create_new_item(item: ItemBase, db: Session = Depends(get_db)):
    new_item = ItemDB(**item.dict())
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@app.get("/modify_item", response_model=ItemBase)
async def modify_item(request: ItemRequest, item: ItemBase, db: Session = Depends(get_db)):
    item_to_modify = db.query(ItemDB).filter(ItemDB.id == request.item_id).first()
    if item_to_modify is None:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item.dict().items():
        setattr(item_to_modify, key, value)
    db.commit()
    db.refresh(item_to_modify)
    return item_to_modify

@app.get("/delete_item", response_model=ItemBase)
async def delete_item(request: ItemRequest, db: Session = Depends(get_db)):
    item_to_delete = db.query(ItemDB).filter(ItemDB.id == request.item_id).first()
    if item_to_delete is None:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item_to_delete)
    db.commit()
    return item_to_delete

@app.get("/add_visit_to_item", response_model=ItemBase)
async def add_visit_to_item(request: ItemRequest, visit: VisitBase, db: Session = Depends(get_db)):
    item = db.query(ItemDB).filter(ItemDB.id == request.item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    new_visit = VisitDB(**visit.dict(), item_id=item_id)
    db.add(new_visit)
    db.commit()
    db.refresh(new_visit)
    return item

@app.get("/modify_visit", response_model=VisitBase)
async def modify_visit(request: VisitRequest, visit: VisitBase, db: Session = Depends(get_db)):
    visit_to_modify = db.query(VisitDB).filter(VisitDB.id == request.visit_id).first()
    if visit_to_modify is None:
        raise HTTPException(status_code=404, detail="Visit not found")
    for key, value in visit.dict().items():
        setattr(visit_to_modify, key, value)
    db.commit()
    db.refresh(visit_to_modify)
    return visit_to_modify



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
