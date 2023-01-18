from fastapi import FastAPI
from pathlib import Path
from fastapi import FastAPI
from fastapi import Request, Response
from fastapi import Header
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import StreamingResponse
from fastapi.responses import StreamingResponse
from io import BytesIO
import os
import re
import cv2
import threading
import io
from PIL import Image

from gpiozero import Servo
from time import sleep
from pydantic import BaseModel

app = FastAPI()

origins = ["*"]

app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
)

CHUNK_SIZE = 1024*1024
video_path = Path("song.mp4")
templates = Jinja2Templates(directory="templates")

i = 0
while True:
    try:
         c = cv2.VideoCapture(i)
         camera = c
         print ("Cam " + str(i) + " is valid.")
         break
    except:
        print ("Cam " + str(i) + " is invalid.")

def gen_frames():  # generate frame by frame from camera
    while True:
        # Capture frame-by-frame
        success, frame = camera.read()  # read the camera frame
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
                                   bytearray(frame) + b'\r\n')

@app.get('/webcam')
def index(request: Request):
    """Video streaming home page."""
    return templates.TemplateResponse("index2.htm", context={"request": request})

@app.get('/feed')
def video_feed():
        return StreamingResponse(gen_frames(), media_type="multipart/x-mixed-replace;boundary=frame")

@app.get("/movie")
async def read_root(request: Request):
        return templates.TemplateResponse("index.htm", context={"request": request})

@app.get("/file")
async def video_endpoint(range: str = Header(None)):
    start, end = range.replace("bytes=", "").split("-")
    start = int(start)
    end = int(end) if end else start + CHUNK_SIZE
    with open(video_path, "rb") as video:
        video.seek(start)
        data = video.read(end - start)
        filesize = str(video_path.stat().st_size)
        headers = {
                'Content-Range': f'bytes {str(start)}-{str(end)}/{filesize}',
                'Accept-Ranges': 'bytes'
                }
        return Response(data, status_code=206, headers=headers, media_type="video/mp4")

servo = Servo(12)

@app.post("/mouvement/{action}")
async def action_rpi(action: str):
    if action == "left":
        servo.min()
    if action == "right":
        servo.max()
    return {action: servo.value}

@app.get("/")
async def main():
        return {"message": "Hello World from RPI"}
