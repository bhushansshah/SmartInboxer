from pydantic_settings import BaseSettings
from pydantic import Field
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    mongodb_uri: str = Field(..., env="MONGODB_URI")
    auth_hash_secret: str = Field(..., env="AUTH_HASH_SECRET")
    auth_hash_algorithm: str = Field("HS256", description="The hash algorithm to be used for jwt.")
    jwt_expiry_in_mins: int = Field(60, description="The expiry duration of the JWT in minutes")
    google_client_id: str = Field(..., env="GOOGLE_CLIENT_ID")
    google_client_secret: str = Field(..., env="GOOGLE_CLIENT_SECRET")

settings = Settings()