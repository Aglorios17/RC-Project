import uvicorn
import time
import threading

if __name__ == "__main__":
#    t = BackgroundTasks()
#    t.start()
    uvicorn.run("app.api:app", host="0.0.0.0", port=8000, reload=True)
