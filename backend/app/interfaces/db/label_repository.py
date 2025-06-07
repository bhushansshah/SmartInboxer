from abc import ABC, abstractmethod
from typing import List
from schemas.label import Label

class LabelRepository(ABC):
    
    @abstractmethod
    async def create_label(self, label: Label) -> dict:
        pass

    @abstractmethod
    async def get_label_by_id(self, label_id: str) -> Label:
        pass 

    @abstractmethod
    async def get_all_labels(self) -> List[Label]:
        pass

    @abstractmethod
    async def update_label(self, label_id: str, label: Label) -> Label:
        pass

    @abstractmethod
    async def delete_label(self, label_id: str) -> bool:
        pass 

