import asyncio
from schemas.user import User
from adapters.db.mongodb.user_repository import MongoUserRepository

user = {
    "name": "parth",
    "email": "whathah05@gmail.com"
}
user2_id = "68322f340d2ca89441822039"
mongo_user_repository = MongoUserRepository()
async def test_create_user(user):
    print('--------------In test create user-----------')
    user = User(**user)
    print(type(user.model_dump(by_alias=True, exclude_none=True)))
    print(user.model_dump(by_alias=True, exclude_none=True))
    response = await mongo_user_repository.create_user(user)
    print(response) 
    return response

async def test_get_all_users():
    print("-------------In test get all users-----------")
    users = await mongo_user_repository.get_all_users()
    print(users)
    return users

async def test_get_user_by_id(user_id: str):
    print("--------------in test get user by id------------")
    user = await mongo_user_repository.get_user_by_id(user_id)
    print(user)
    return user

async def test_delete_user(user_id: str):
    print("-------------in test delete user----------------")
    response = await mongo_user_repository.delete_user(user_id)
    print(response)
    return response

async def main(user, user_id):
    await test_create_user(user)
    await test_get_all_users()
    await test_get_user_by_id(user_id)
    await test_delete_user(user_id)

asyncio.run(main(user, user2_id))