from fastapi import APIRouter
from adapters.db.mongodb.user_repository import mongo_user_repository
from schemas.signup import PrimitiveSignupRequest
from schemas.login import PrimitiveLoginRequest
from schemas.user import User
from utils.auth import hash_password, create_jwt, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/google/login")
async def google_login():
    return {"message": "Dummy Google OAuth login"}

@router.post("/login")
async def primitive_login(payload: PrimitiveLoginRequest):
    username = payload.username
    password = payload.password
    if username == "" or password == "":
        return {
            "status": "error",
            "message": "Username or password is empty."
        }

    users = await mongo_user_repository.get_all_users()
    potential_user = None
    for user in users:
        if user.username == username:
            potential_user = user
            break

    if potential_user is None:
        return {
            "status": "error",
            "message": f"No user with the given username - {username}"
        }

    
    if verify_password(password, potential_user.password_hash):
        user_jwt = create_jwt({
            "username": username        
        })
        return {
            "status": "success",
            "_id": potential_user.user_id,
            "login_token": user_jwt 
        }
    else:
        return {
            "status": "error",
            "message": "Password incorrect."
        }

@router.post("/signup")
async def signup(payload: PrimitiveSignupRequest):
    username = payload.username
    password = payload.password
    if username == "" or password == "":
        return {
            "status": "error",
            "message": "Username or password is empty."
        }

    users = await mongo_user_repository.get_all_users()

    username_found = False
    for user in users:
        if user.username == username:
            username_found = True
            break
    
    if username_found:
        return {
            "status": "error",
            "message": "Username already taken."
        }

    password_hash = hash_password(password)
    user = {
        "username": username,
        "password_hash": password_hash
    }
    
    user = User(**user)
    response = await mongo_user_repository.create_user(user)
    if response['status']:
        user_jwt = create_jwt({
            "username": username
        })

        return {
            "status": "success",
            "_id": response['_id'],
            "login_token": user_jwt 
        }
    else:
        return {
            "status": "error",
            "message": response.message
        }
