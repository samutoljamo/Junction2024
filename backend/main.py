from fastapi import FastAPI, HTTPException, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, RedirectResponse
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, Session
from pydantic import BaseModel
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
    created_at: datetime
    pictures: List[Picture] = []
    
    class Config:
        from_attributes = True

class ImageUpload(BaseModel):
    image: str
    visit_id: int

# FastAPI app setup
app = FastAPI()

client = instructor.from_openai(OpenAI(api_key=os.getenv('OPENAI_API_KEY')))
model = "gpt-4o"

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
class ItemCategory(Enum):
    # all the categories that the KONE company has
    device = "device"
    structure = "structure"
    other = "other"

class ItemStructure(BaseModel):
    category: ItemCategory = Field(description="The category of the item", default=ItemCategory.other)
    serial_number: Optional[str] = Field(description="The serial number of the device if found", default=None)
    material: Optional[str] = Field(description="The material of the item", default=None)
    manufacturing_year: Optional[int] = Field(description="The manufacturing year of the item", default=None)
    surface_condition: Optional[str] = Field(description="The surface condition of the item", default=None)


async def extract_item_info_from_image(base64_str: str) -> ItemStructure:
    try:
        if not base64_str.startswith("data:image"):
            base64_str = "data:image/jpeg;base64," + base64_str

        item = client.chat.completions.create(
            model=model,
            response_model=ItemStructure,
            messages=[
                {
                    "role": "system",
                    "content": "You are a system that always extracts information from images related to KONE devices and other structures."
                    "role": "user",
                    "content": [
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": base64_str
                            }
                        }
                    ]
                }
            ],
        )
        return item
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Vision API error: {str(e)}")


@app.get("/gallery", response_class=HTMLResponse)
async def show_gallery(db: Session = Depends(get_db)):
    # Get all items with their pictures
    items = db.query(ItemDB).all()
    
    # Create HTML content
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Image Gallery</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                background-color: #f0f0f0;
            }
            .item {
                background: white;
                padding: 20px;
                margin-bottom: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .item-header {
                margin-bottom: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid #eee;
            }
            .pictures-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 20px;
                padding: 10px;
            }
            .picture-card {
                background: white;
                padding: 10px;
                border-radius: 4px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            .picture-card img {
                width: 100%;
                height: 200px;
                object-fit: cover;
                border-radius: 4px;
            }
            .picture-info {
                margin-top: 8px;
                font-size: 0.9em;
                color: #666;
            }
        </style>
    </head>
    <body>
    """
    
    for item in items:
        html_content += f"""
        <div class="item">
            <div class="item-header">
                <h2>{item.name} - {item.id}</h2>
                <p>{item.description or ''}</p>
            </div>
            <div class="pictures-grid">
        """
        
        for picture in item.pictures:
            html_content += f"""
                <div class="picture-card">
                    <img src="{picture.url}" alt="Picture for {item.name}">
                    <div class="picture-info">
                        Added: {picture.created_at.strftime('%Y-%m-%d %H:%M')}
                    </div>
                </div>
            """
        
        html_content += """
            </div>
        </div>
        """
    
    html_content += """
    <a href="/test/upload/1">Upload Test Image</a>
    </body>
    </html>
    """
    
    return html_content

@app.get("/api/pictures", response_model=List[Picture])
async def list_pictures(db: Session = Depends(get_db)):
    pictures = db.query(PictureDB).all()
    return pictures

@app.get("/api/items/{item_id}/pictures", response_model=List[Picture])
async def get_item_pictures(item_id: int, db: Session = Depends(get_db)):
    pictures = db.query(PictureDB).filter(PictureDB.item_id == item_id).all()
    return pictures

@app.post("/items/", response_model=Item)
async def create_item(item: ItemBase, db: Session = Depends(get_db)):
    db_item = ItemDB(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.post("/upload/")
async def upload_image(payload: ImageUpload, db: Session = Depends(get_db)):
    try:
        visit = db.query(VisitDB).filter(VisitDB.id == payload.visit_id).first()
        if not visit:
            raise HTTPException(status_code=404, detail="visit not found")
        
        image_url = await save_image(payload.image)

        item = await extract_item_info_from_image(payload.image)

        # add the extracted information to the visit
        #...

        
        # create a new picture object
        new_picture = PictureDB(
            url=image_url,
            visit_id=payload.visit_id
        )
        
        
        return {
            "message": "Image uploaded successfully",
            "item_id": item.id,
            "picture_id": new_picture.id,
            "url": image_url
        }
        
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

@app.get("/items/{item_id}", response_model=Item)
async def get_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(ItemDB).filter(ItemDB.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

# Test route
@app.post("/test/upload/")
async def test_upload(db: Session = Depends(get_db)):
    try:
        test_item = ItemDB(name="Test Item", description="Test Description")
        db.add(test_item)
        db.commit()
        db.refresh(test_item)
        
        img = Image.new('RGB', (100, 100), color='red')
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='PNG')
        img_byte_arr = img_byte_arr.getvalue()
        
        base64_encoded = base64.b64encode(img_byte_arr).decode()
        
        image_url = await save_image(base64_encoded)
        
        new_picture = PictureDB(
            url=image_url,
            item_id=test_item.id
        )
        
        db.add(new_picture)
        db.commit()
        db.refresh(new_picture)
        
        return {
            "message": "Test completed successfully",
            "item_id": test_item.id,
            "picture_id": new_picture.id,
            "url": image_url
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Test failed: {str(e)}")

# upload new test image to item number test route
@app.get("/test/upload/{item_id}")
async def test_upload(item_id: int, db: Session = Depends(get_db)):
    try:
        test_item = db.query(ItemDB).filter(ItemDB.id == item_id).first()
        if not test_item:
            raise HTTPException(status_code=404, detail="Item not found")
        
        img = Image.new('RGB', (100, 100), color='blue')
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='PNG')
        img_byte_arr = img_byte_arr.getvalue()
        
        base64_encoded = base64.b64encode(img_byte_arr).decode()
        
        image_url = await save_image(base64_encoded)
        
        new_picture = PictureDB(
            url=image_url,
            item_id=test_item.id
        )
        
        db.add(new_picture)
        db.commit()
        db.refresh(new_picture)
        return RedirectResponse(url="/gallery")
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Test failed: {str(e)}")

@app.get("/item_ids")
async def get_item_ids(db: Session = Depends(get_db)):
    items = db.query(ItemDB).all()
    return [item.id for item in items]
