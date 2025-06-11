from fastapi import APIRouter
from adapters.db.mongodb.user_repository import mongo_user_repository
from schemas.signup import PrimitiveSignupRequest
from schemas.login import PrimitiveLoginRequest, GoogleLoginRequest
from schemas.user import User
from utils.auth import hash_password, create_jwt, verify_password
import httpx
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from config.settings import settings

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/google/login")
async def google_login(payload: GoogleLoginRequest):
    try:
        code = payload.code

        # Exchange code for tokens
        async with httpx.AsyncClient() as client:
            token_res = await client.post(
                "https://oauth2.googleapis.com/token",
                data={
                    "code": code,
                    "client_id": settings.google_client_id,
                    "client_secret": settings.google_client_secret,
                    "redirect_uri": "postmessage",
                    "grant_type": "authorization_code",
                },
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            )

        if token_res.status_code != 200:
            return {"status": "error", "message": "Failed to fetch Google tokens."}

        tokens = token_res.json()
        print('Tokens:', tokens)
        idinfo = id_token.verify_oauth2_token(
            tokens["id_token"],
            google_requests.Request(),
            settings.google_client_id,
        )

        email = idinfo.get("email")
        name = idinfo.get("given_name")
        if name is None:
            name = idinfo.get("name")

        if not email:
            return {"status": "error", "message": "Unable to retrieve email from ID token."}

        # Check if user exists in DB
        users = await mongo_user_repository.get_all_users()
        user = next((u for u in users if u.email == email), None)

        # If user does not exist, create one
        if not user:
            new_user = User(email=email, name=name)
            result = await mongo_user_repository.create_user(new_user)
            user_id = result["_id"]
        else:
            user_id = user.user_id

        user = await mongo_user_repository.get_user_by_id(user_id)
        jwt_token = create_jwt({
                    "user": user.model_dump(by_alias=True, exclude_none=True),
                    "tokens": tokens
                })

        return {
            "status": "success",
            "user": user.model_dump(by_alias=True, exclude_none=True),
            "login_token": jwt_token
        }

    except Exception as e:
        return {"status": "error", "message": f"Exception occurred: {str(e)}"}

    

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
            "user": potential_user.model_dump(by_alias=True, exclude_none=True)
        })
        return {
            "status": "success",
            "user": potential_user.model_dump(by_alias=True, exclude_none=True),
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
        "password_hash": password_hash,
        "name": "Kevin"
    }
    
    user = User(**user)
    response = await mongo_user_repository.create_user(user)
    if response['status']:
        user_jwt = create_jwt({
            "user": user.model_dump(by_alias=True, exclude_none=True),
            "tokens": tokens
        })

        return {
            "status": "success",
            "user": user.model_dump(by_alias=True, exclude_none=True),
            "login_token": user_jwt 
        }
    else:
        return {
            "status": "error",
            "message": response.message
        }
