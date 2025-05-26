from pydantic import BaseModel

class PrimitiveSignupRequest(BaseModel):
    username: str
    password: str