from pydantic import BaseModel

class PrimitiveLoginRequest(BaseModel):
    username: str
    password: str

class GoogleLoginRequest(BaseModel):
    code: str