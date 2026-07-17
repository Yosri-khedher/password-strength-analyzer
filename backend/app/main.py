from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import PasswordRequest
from app.analyzer import analyze_password


app = FastAPI(
    title="Password Strength Analyzer API",
    version="1.0.0"
)


origins = [
    "http://localhost:5173"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
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