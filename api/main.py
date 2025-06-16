from fastapi import FastAPI, HTTPException
import uvicorn
from explainium_agent.crew import Explainium
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def test():
    return {'message': 'Hello World'}

@app.get("/explain")
async def explain(video_id: str):

    if not video_id:
        raise HTTPException(status_code=404, detail="Video id not found")

    inputs = {
        'youtube_video_id': video_id
    }
    
    try:
        result = Explainium().crew().kickoff(inputs=inputs)
        return {"content": result.raw}
    except Exception as e:
        raise HTTPException(status_code=404, detail="Something went wrong with Agent")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)