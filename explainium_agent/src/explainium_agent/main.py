#!/usr/bin/env python
import sys
import warnings
import json

from datetime import datetime

from explainium_agent.crew import Explainium

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")

# This main file is intended to be a way for you to run your
# crew locally, so refrain from adding unnecessary logic into this file.
# Replace with inputs you want to test with, it will automatically
# interpolate any tasks and agents information

def run():
    """
    Run the crew.
    """
    
    inputs = {
        'youtube_video_id': "https://www.youtube.com/watch?v=qnF0Rowu__M"
    }
    
    try:
        result = Explainium().crew().kickoff(inputs=inputs)
        print(result)
    except Exception as e:
        raise Exception(f"An error occurred while running the crew: {e}")

# run()