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
        
        return "They're rebuilding Airflow, but now it forgets things, sometimes talks back and occasionally makes stuff up. Welcome to agent orchestration, and here's why data engineers already know how to fix it. Most people still think that orchestration looks like moving data from A to B. But agent orchestration that's something else entirely. Now you're coordinating decisions, not just data. Agent A needs to plan. Agent B needs to execute while agent C checks if it worked. So if anything breaks or forgets what just happened, you don't just get a failed task, you get an AI that starts making things up with confidence. And here's why your skills now matter more than ever. You have already built fault tolerant DAGs. You understand dependency flows. You know how to use retries, logging, and context loss to your advantage. And you've already learned how to keep systems running when one part breaks. While everyone else is obsessing over all these prompts, you've already mastered the thing that AI teams keep breaking, the coordination. Let me give it to you straight. Most AI demos look incredible. They look amazing. They're beautiful. And then someone tries to scale them and maybe the agent needs some memory or recovery or guard rails because there's some regulations and like HIPPA things that it's going to start giving out to people. Then suddenly everybody realizes crap we need orchestration. And that's when they reach out for something that you already know. Langraph is just DAGs with memory. While we have Crew AI out there that's dependency management with some chat added to it and then we have this autogen and that's just retry logic with some feedback. So they're rebuilding airflow but this version it hallucinates. it loses context and it doesn't retry unless you specifically tell it to. So here's the question. Are AI engineers just the next gen data engineers? Honestly, only the ones who know how to build things that don't collapse the second that they scale. That means you. Because while everyone else around you is trying to prompt their way to intelligence, you've already learned how to build resilient systems. So what do you need to do now? Go out, try Langraph or Crew AI. Don't worry about writing fancy prompts. Just practice the things that you already know. Build task dependencies. Add fallback logic. pass context between steps and figure out what happens when something doesn't quite make it. Make it observable. Because here's the truth. Your pipelines just got brains. They are now the scarecrow who made it to the wizard and got their wish. And they need someone who knows how to keep them alive. So, what do you think? Is AI engineering just data engineering with some smarter pieces, or is this something new entirely? Drop me a comment down below. I want to know where you see your skills going. If you want a walkthrough of an actual agent orchestration pattern, I've got one of those in the works, cuz I'm playing with these tools now so that I could skill up and be ready for the next evolution of data engineering. And if you're serious about leveling up, be sure that you go out and download this orchestration starter kit below. You've already got the mindset. Now you just need the map."
        
        # supadata = Supadata(api_key=os.environ.get("SUPADATA_API_KEY"))

        # load_dotenv()
        # try:
        #     transcript = supadata.youtube.transcript(video_id=youtube_video_id, lang="en", text=True)
        #     return transcript.content
        # except SupadataError as error:
        #     if error.error == "not-found":
        #         return "Video not found"
        #     return f"Error message: {error.message}"
       
