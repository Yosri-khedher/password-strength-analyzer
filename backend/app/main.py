from fastapi import FastAPI

from app.models import PasswordRequest
from app.analyzer import analyze_password

app = FastAPI(
    title="Password Strength Analyzer API",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to Password Strength Analyzer API!"
    }


@app.post("/analyze")
def analyze(request: PasswordRequest):
    result = analyze_password(request.password)

    return result