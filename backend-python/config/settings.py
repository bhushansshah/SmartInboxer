from pydantic_settings import BaseSettings
from pydantic import Field
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    mongodb_uri: str = Field(..., env="MONGODB_URI")
    mongodb_password: str = Field(..., env="MONGODB_PASSWORD")

settings = Settings()