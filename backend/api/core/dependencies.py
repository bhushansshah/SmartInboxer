from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from backend.schemas.user import User
from jose import JWTError, jwt
from config.settings import settings
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")  # You can leave tokenUrl as-is

SECRET_KEY = settings.auth_hash_secret
ALGORITHM = settings.auth_hash_algorithm

async def verify_user_logged_in(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user: str = payload.get("user")
        if user is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return User(**user)  # Assuming you have a User model to parse the user data
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
