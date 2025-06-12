# repositories/mongo_user_repository.py
from typing import List, Optional
from bson import ObjectId
from schemas.user import User
from app.interfaces.db.user_repository import UserRepository
from adapters.db.mongodb.client import users_collection

class MongoUserRepository(UserRepository):
    def __init__(self):
        self.collection = users_collection

    async def create_user(self, user: User) -> dict:
        result = await self.collection.insert_one(user.model_dump(by_alias=True, exclude_none=True))

        if result.acknowledged:
            return {
                    "status": True, 
                    "_id": str(result.inserted_id)
            }
        else:
            return {
                "status": False,
                "message": "User not created."
            }

    async def delete_user(self, user_id: str) -> bool:
        result = await self.collection.delete_one({"_id": ObjectId(user_id)})
        return result.deleted_count == 1

    async def get_user_by_id(self, user_id: str) -> Optional[User]:
        document = await self.collection.find_one({"_id": ObjectId(user_id)})
        if document:
            return User(**document)
            
        return None

    async def get_user_by_email(self, email: str) -> Optional[User]:
        document = await self.collection.find_one({"email": email})
        if document:
            return User(**document)
        return None

    async def get_all_users(self) -> List[User]:
        cursor = self.collection.find()
        users = []
        async for document in cursor:
            users.append(User(**document))
        return users

    async def update_user(self, user_id: str, updated_user_data: dict) -> User:
        update_data = updated_user_data
        result = await self.collection.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
        try :
            if result.modified_count == 1:
                updated_user = await self.get_user_by_id(user_id)
                return updated_user
            if result.matched_count == 0:
                raise ValueError("User not updated.")
        except Exception as e:
            raise e

mongo_user_repository = MongoUserRepository()