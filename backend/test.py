import requests
import base64

# Create a test item
item = {
    "name": "Test Product",
    "description": "A test product"
}
response = requests.post("http://localhost:8000/items/", json=item)
item_id = response.json()["id"]

# Upload an image
with open("test.png", "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read()).decode()

payload = {
    "image": encoded_string,
    "item_id": item_id
}
response = requests.post("http://localhost:8000/upload/", json=payload)

# Or use the test endpoint to create a sample item with image
response = requests.post("http://localhost:8000/test/upload/")
