from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from api.core.dependencies import verify_user_logged_in
from schemas.label import Label, LabelRequest
from adapters.db.mongodb.label_repository import mongo_label_repository

router = APIRouter(prefix="/labels", tags=["labels"])


@router.get("/{label_id}")
async def get_label(label_id: str, user=Depends(verify_user_logged_in)):
    label = await mongo_label_repository.get_label_by_id(label_id)
    if not label:
        raise HTTPException(status_code=404, detail="Label not found")
    return {
        "status": "success",
        "data": label
    }

@router.get("")
async def get_labels(user=Depends(verify_user_logged_in)):
    labels = await mongo_label_repository.get_all_labels()
    return {
        "status": "success",
        "data": labels
    }

@router.post("")
async def create_label(label: LabelRequest, user=Depends(verify_user_logged_in)):
    if user is None:
        raise HTTPException(status_code=401, detail="User not authenticated")
    user_id = user.user_id
    label = Label(**{
        "label_name": label.label_name,
        "label_description": label.label_description,
        "label_color": label.label_color,
        "_user_id": user_id
    })
    result = await mongo_label_repository.create_label(label)
    if not result["status"]:
        raise HTTPException(status_code=400, detail=result.get("message", "Label not created"))

    addedLabel = await mongo_label_repository.get_label_by_id(result["_id"])
    return {
        "status": "success",
        "data": addedLabel
    }

@router.put("/{label_id}")
async def update_label(label_id: str, label: LabelRequest, user=Depends(verify_user_logged_in)):
    try:
        response = await mongo_label_repository.update_label(label_id, label)
        if not response:
            raise HTTPException(status_code=400, detail="Label not updated")
        updated_label = await mongo_label_repository.get_label_by_id(label_id)
        return {
            "status": "success",
            "data": updated_label
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.delete("/{label_id}")
async def delete_label(label_id: str, user=Depends(verify_user_logged_in)):
    deleted = await mongo_label_repository.delete_label(label_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Label not found")
    return {
        "status": "success",
        "message": "Label deleted successfully"
    }