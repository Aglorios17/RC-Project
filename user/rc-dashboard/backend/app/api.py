from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def main():
    r = requests.get('http://192.168.1.140:8000/')
    return (r.json())
@app.get("/favicon.ico")
async def rien():
    return

@app.get("/movie")
async def main():
    r = requests.get('http://192.168.1.140:8000/movie')
    return (r.text)

@app.get("/webcam")
async def main():
    r = requests.get('http://192.168.1.140:8000/webcam')
    return (r.text)
