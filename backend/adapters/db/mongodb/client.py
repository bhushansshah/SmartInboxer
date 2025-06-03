# db/client.py
from motor.motor_asyncio import AsyncIOMotorClient
from config.settings import settings

client = AsyncIOMotorClient(settings.mongodb_uri)
db = client["SmartInboxer"]

users_collection = db["User"]
labels_collection = db["Label"]
