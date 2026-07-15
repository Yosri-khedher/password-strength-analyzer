from pydantic import BaseModel


class PasswordRequest(BaseModel):
    password: str


class PasswordResponse(BaseModel):
    score: int
    strength: str
    crack_time: str
    missing: list[str]
    suggestions: list[str]