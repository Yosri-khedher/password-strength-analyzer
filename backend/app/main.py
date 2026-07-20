from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import PasswordRequest
from app.analyzer import analyze_password


app = FastAPI(
    title="Password Strength Analyzer API",
    version="1.0.0"
)


origins = [
    "http://localhost:5173",
    "https://password-strength-analyzer-eight-xi.vercel.app",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
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