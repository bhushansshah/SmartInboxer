from pydantic import BaseModel, Field, validator
from typing import Optional
from bson import ObjectId

class Email(BaseModel):
    email_id: str = Field(..., alias="_id", description="Unique identifier for the email")
    user_id: str = Field(..., description="ID of the user who owns the email")
    content: str = Field(..., description="Contents of the email")

    @validator("user_id", pre=True, always=True)
    def convert_object_id(cls, v):
        return str(v) if isinstance(v, ObjectId) else v