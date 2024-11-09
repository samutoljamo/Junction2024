
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import time

Base = declarative_base()
# SQLAlchemy Models
class BuildingDB(Base):
    __tablename__ = 'buildings'
    id = Column(Integer, primary_key=True)
    location = Column(String)

    items = relationship('ItemDB', back_populates='building')

class ItemType(Base):
    __tablename__ = 'item_types'
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)

    items = relationship('ItemDB', back_populates='type')

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
    building = relationship('BuildingDB', back_populates='items')
    type = relationship('ItemType', back_populates='items')
    type_id = Column(Integer, ForeignKey('item_types.id'))
    visits = relationship("VisitDB", back_populates="item", cascade="all, delete-orphan")


class VisitDB(Base):
    __tablename__ = "visits"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(Integer, default=time.time())
    condition = Column(String)
    notes = Column(String)
    item_id = Column(Integer, ForeignKey("items.id"))

    item = relationship('ItemDB', back_populates='visits')
    pictures = relationship('PictureDB', back_populates='visit')

class PictureDB(Base):
    __tablename__ = "pictures"
    
    id = Column(Integer, primary_key=True, index=True)
    url = Column(String)
    visit_id = Column(Integer, ForeignKey("visits.id"))
    
    visit = relationship('VisitDB', back_populates='pictures')



# Pydantic response models
from pydantic import BaseModel
from typing import List, Optional

class PictureBase(BaseModel):
    id: int
    url: str

    class Config:
        orm_mode = True

class VisitBase(BaseModel):
    id: int
    timestamp: int
    condition: str
    notes: str
    pictures: List[PictureBase] = []

    class Config:
        orm_mode = True

class ItemBase(BaseModel):
    id: int
    name: str
    x: int
    y: int
    floor: int
    serial_number: Optional[str]
    material: Optional[str]
    model: Optional[str]
    manufacturer: Optional[str]
    description: Optional[str]
    manufacturing_year: Optional[int]
    visits: List[VisitBase] = []

    class Config:
        orm_mode = True

class BuildingBase(BaseModel):
    id: int
    location: str
    items: List[ItemBase] = []

    class Config:
        orm_mode = True

