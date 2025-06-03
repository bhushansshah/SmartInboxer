from pydantic import BaseModel, Field, validator
from typing import Optional
from bson import ObjectId

class Label(BaseModel):
    label_id: Optional[str] = Field(None, alias="_id")
    label_name: str = Field(None, description="Name of the label")
    label_description: Optional[str] = Field(None, description="Description of the label")
    label_color: Optional[str] = Field(None, description="Color of the label in hex format")
    user_id: str = Field(None, alias="_user_id", description="ID of the user who created the label")

    @validator("label_id", pre=True, always=True)
    def convert_object_id(cls, v):
        return str(v) if isinstance(v, ObjectId) else v