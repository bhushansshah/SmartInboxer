from fastapi import APIRouter, Depends
from api.core.dependencies import verify_user_logged_in

router = APIRouter(prefix="/integrations", tags=["integrations"])

@router.post("/gmail")
async def connect_gmail(user=Depends(verify_user_logged_in)):
    return {"message": "Dummy Gmail OAuth integration"}
