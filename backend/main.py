from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from enum import Enum
import instructor
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, RedirectResponse
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
from pydantic import BaseModel


load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
                    "content": "You are a system that always extracts information from images. If some information is not visible in the image, leave it blank.",
                    "role": "user",
                    "content": content
                }
            ],
        )
        return item
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Vision API error: {str(e)}")

client = instructor.from_openai(OpenAI(api_key=os.getenv("OPENAI_API_KEY")))
model = "gpt-4o-mini"



@app.post("/uploadtest/", response_model=ItemStructure)
async def upload_image():
    try:
        # Open the image file in binary mode
        with open("kone.png", "rb") as image_file:
            # Read the image and encode it to base64
            base64_image = base64.b64encode(image_file.read()).decode("utf-8")
            # Format as a data URL
            image_data_url = f"data:image/png;base64,{base64_image}"


        extracted_item = await extract_item_info_from_images([image_data_url])
        print(extracted_item)

        return extracted_item

    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

class ImageUpload(BaseModel):
    images: List[str] = Field(description="List of base64 encoded images", default=[])

@app.post("/upload/", response_model=ItemStructure)
async def upload_image(payload: ImageUpload):
    try:

        # extract the item information from the image
        extracted_item = await extract_item_info_from_images(payload.images)
        
        return extracted_item
               
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

