from fastapi import APIRouter, Depends
from api.core.dependencies import verify_user_logged_in

router = APIRouter(prefix="/labels", tags=["labels"])

@router.get("")
async def get_labels(user=Depends(verify_user_logged_in)):
    return {"message": "Dummy get labels"}

@router.post("")
async def create_label(user=Depends(verify_user_logged_in)):
    return {"message": "Dummy create label"}

@router.put("/{label_id}")
async def update_label(label_id: str, user=Depends(verify_user_logged_in)):
    return {"message": f"Dummy update label {label_id}"}

@router.delete("/{label_id}")
async def delete_label(label_id: str, user=Depends(verify_user_logged_in)):
    return {"message": f"Dummy delete label {label_id}"}
