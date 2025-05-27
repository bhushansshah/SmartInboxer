from abc import ABC, abstractmethod
from typing import List
from schemas.user import User
class UserRepository(ABC):
    
    @abstractmethod
    async def create_user(self, user: User) -> dict:
        pass 

    @abstractmethod
    async def delete_user(self, user_id: str) -> bool:
        pass 

    @abstractmethod
    async def get_user_by_id(self, user_id: str) -> User:
        pass 

    @abstractmethod
    async def get_all_users(self, user_id: str) -> List:
        pass 