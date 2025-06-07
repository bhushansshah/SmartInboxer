from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from config.settings import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    hashed_password = pwd_context.hash(password)
    return hashed_password

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_jwt(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=settings.jwt_expiry_in_mins))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.auth_hash_secret, algorithm=settings.auth_hash_algorithm)
