from typing import List, Optional
from bson import ObjectId
from schemas.label import Label, LabelRequest
from app.interfaces.db.label_repository import LabelRepository
from adapters.db.mongodb.client import labels_collection

class MongoLabelRepository(LabelRepository):
    def __init__(self):
        self.collection = labels_collection

    async def create_label(self, label: Label) -> dict:
        result = await self.collection.insert_one(label.model_dump(by_alias=True, exclude_none=True))

        if result.acknowledged:
            return {
                    "status": True, 
                    "_id": str(result.inserted_id)
            }
        else:
            return {
                "status": False,
                "message": "Label not created."
            }

    async def get_label_by_id(self, label_id: str) -> Optional[Label]:
        document = await self.collection.find_one({"_id": ObjectId(label_id)})
        if document:
            return Label(**document)
        return None

    async def get_all_labels(self) -> List[Label]:
        cursor = self.collection.find()
        labels = []
        async for document in cursor:
            labels.append(Label(**document))
        return labels

    async def update_label(self, label_id: str, label: LabelRequest) -> Label:
        update_data = label.model_dump(by_alias=True, exclude_none=True)
        result = await self.collection.update_one({"_id": ObjectId(label_id)}, {"$set": update_data})
        try :
            if result.modified_count == 1:
                updated_label = await self.get_label_by_id(label_id)
                return updated_label
            if result.matched_count == 0:
                raise ValueError("Label not updated.")
        except Exception as e:
            raise e

    
    async def delete_label(self, label_id: str) -> bool:
        result = await self.collection.delete_one({"_id": ObjectId(label_id)})
        return result.deleted_count == 1

mongo_label_repository = MongoLabelRepository()