from crewai.tools import BaseTool
from typing import Type
from dotenv import load_dotenv
from supadata import Supadata, SupadataError
import os

class YoutubeVideoTranscript(BaseTool):
    name: str = "Extract transcript from Youtube video"
    description: str = (
        "extract the transcript from a youtube video from a youtube_video_id from the id and returns the transcript of the video"
    )
    def _run(self, youtube_video_id: str) -> str:
        
        supadata = Supadata(api_key=os.environ.get("SUPADATA_API_KEY"))

        load_dotenv()
        try:
            transcript = supadata.youtube.transcript(video_id=youtube_video_id, lang="en", text=True)
            return transcript.content
        except SupadataError as error:
            if error.error == "not-found":
                return "Video not found"
            return f"Error message: {error.message}"
       
