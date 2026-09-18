import os

from dotenv import load_dotenv
from pathlib import Path

load_dotenv ()

LLM_API_KEY = os.getenv ('LLM_API_KEY')

LLM_MODEL = os.getenv ('LLM_MODEL')

PROJECT_ROOT = Path(__file__).paret.paents

PROMPTS_DIR = PROJECT_ROOT / "prompt" / "templates"

print (f"{PROMPTS_DIR}")