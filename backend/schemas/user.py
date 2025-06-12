from pydantic import BaseModel, Field, validator
from typing import Optional
from bson import ObjectId

class User(BaseModel):
    user_id: Optional[str] = Field(None, alias="_id")
    username: Optional[str] = Field(None, description="Username for the user")
    password_hash: Optional[str] = Field(None, description="Hash of the password")
    name: Optional[str] = Field(None, description="Name of the User")
    email: Optional[str] = Field(None, description="Email of the user")
    tokens: Optional[dict] = Field(None, description="Tokens associated with the user")
    isGmailConnected: Optional[bool] = Field(False, description="Flag indicating if Gmail is connected")
    gmail_history_id: Optional[int] = Field(None, description="ID for Gmail history tracking")
    
    @validator("user_id", pre=True, always=True)
    def convert_object_id(cls, v):
        return str(v) if isinstance(v, ObjectId) else v