from fastapi import APIRouter, Depends
from api.core.dependencies import verify_user_logged_in
from adapters.db.mongodb.user_repository import mongo_user_repository
from schemas.user import User


router = APIRouter(prefix="/user", tags=["user"])

@router.get("/")
async def get_user(user: User = Depends(verify_user_logged_in)):
    """
    Retrieves the user's information.
    Args:
        user (User): The currently logged-in user.
    Returns:
        dict: The user's information.
    """
    if not user:
        return {"status": "error", "message": "User not found."}

    user_data = await mongo_user_repository.get_user_by_id(user.user_id)
    if not user_data:
        return {"status": "error", "message": "User not found."}

    return {"status": "success", "data": user_data}
    
    