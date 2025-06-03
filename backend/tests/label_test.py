# import sys
# import os
# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import asyncio
from schemas.label import Label
from adapters.db.mongodb.label_repository import MongoLabelRepository

label = {
    "label_id": "683f59f4664f3bff49225263",  # Example ObjectId as string
    "label_name": "Important",
    "label_description": "This label is used for important emails",
    "label_color": "#FF5733",  # Example color in hex format
    # Note: The user_id should be replaced with an actual user ID from your database
    "user_id": "64a22f340d2ca89441822098"
}
label2_id = "683f59f4664f3bff49225263"
mongo_label_repository = MongoLabelRepository()

async def test_create_label(label):
    print('--------------In test create label-----------')
    label = Label(**label)
    print(type(label.model_dump(by_alias=True, exclude_none=True)))
    print(label.model_dump(by_alias=True, exclude_none=True))
    response = await mongo_label_repository.create_label(label)
    print(response)
    return response

async def test_get_all_labels():
    print("-------------In test get all labels-----------")
    labels = await mongo_label_repository.get_all_labels()
    print(labels)
    return labels

async def test_get_label_by_id(label_id: str):
    print("--------------in test get label by id------------")
    label = await mongo_label_repository.get_label_by_id(label_id)
    print(label)
    return label

async def test_delete_label(label_id: str):
    print("-------------in test delete label----------------")
    response = await mongo_label_repository.delete_label(label_id)
    print(response)
    return response

async def test_update_label(label_id: str, update_data: Label):
    print("-------------in test update label----------------")
    response = await mongo_label_repository.update_label(label_id, update_data)
    print(response)
    return response

async def main(label, label_id):
    await test_create_label(label)
    await test_get_all_labels()
    await test_get_label_by_id(label_id)
    # Example update data, adjust fields as needed
    update_data = Label(
        label_name= "Updated Important",
        label_description= "Updated description",
        label_color= "#00FF00"
    )
    await test_update_label(label_id, update_data)
    await test_delete_label(label_id)

asyncio.run(main(label, label2_id))
