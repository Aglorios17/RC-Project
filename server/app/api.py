from fastapi import FastAPI
from pathlib import Path
from fastapi import FastAPI
from fastapi import Request, Response
from fastapi import Header
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import os
import re

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


@app.get("/")
async def main():
        return {"message": "Hello World from RPI"}
