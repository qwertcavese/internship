from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
lst = []
id_counter = 0

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to the specific origin(s) you want to allow
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get-example")
def get_example():
    return lst

@app.post("/post-example")
def post_example(value: str):
    global id_counter
    key = "Name"
    lst.append({"id": id_counter, key: value})
    id_counter += 1
    return {"message": "Data added successfully"}

@app.put("/put-example/{id}")
def put_example(id: int, new_value: str):
    for i, item in enumerate(lst):
        if item["id"] == id:
            lst[i]["Name"] = new_value
            return {"message": "Value updated successfully"}
    raise HTTPException(status_code=404, detail="Key not found")

@app.delete("/delete-example/{id}")
def delete_example(id: int):
    for i, item in enumerate(lst):
        if item["id"] == id:
            del lst[i]
            return {"message": "Deleted successfully"}
    raise HTTPException(status_code=404, detail="Key not found")
