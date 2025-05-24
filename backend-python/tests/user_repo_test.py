
import asyncio
from schemas.user import User
from adapters.db.mongodb.user_repository import MongoUserRepository

user = {
    "name": "parth",
    "email": "parth.shah05@gmail.com"
}
async def test_create_user(user):
    user = User(**user)
    print(type(user.model_dump(by_alias=True, exclude_none=True)))
    print(user.model_dump(by_alias=True, exclude_none=True))
    mongo_user_repository = MongoUserRepository()
    response = await mongo_user_repository.create_user(user)
    print(response) 
    return response

asyncio.run(test_create_user(user))
