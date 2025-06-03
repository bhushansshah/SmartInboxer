from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from api.core.dependencies import verify_user_logged_in
from schemas.label import Label
from adapters.db.mongodb.label_repository import mongo_label_repository

router = APIRouter(prefix="/labels", tags=["labels"])

@router.get("/{label_id}", response_model=Label)
async def get_label(label_id: str, user=Depends(verify_user_logged_in)):
    label = await mongo_label_repository.get_label_by_id(label_id)
    if not label:
        raise HTTPException(status_code=404, detail="Label not found")
    return label

@router.get("", response_model=List[Label])
async def get_labels(user=Depends(verify_user_logged_in)):
    labels = await mongo_label_repository.get_all_labels()
    return labels

@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_label(label: Label, user=Depends(verify_user_logged_in)):
    result = await mongo_label_repository.create_label(label)
    if not result["status"]:
        raise HTTPException(status_code=400, detail=result.get("message", "Label not created"))
    return result

@router.put("/{label_id}", response_model=Label)
async def update_label(label_id: str, label: Label, user=Depends(verify_user_logged_in)):
    try:
        updated_label = await mongo_label_repository.update_label(label_id, label)
        return updated_label
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.delete("/{label_id}", response_model=dict)
async def delete_label(label_id: str, user=Depends(verify_user_logged_in)):
    deleted = await mongo_label_repository.delete_label(label_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Label not found")
    return {"status": True, "message": f"Label {label_id} deleted"}