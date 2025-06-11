import base64
import json
from fastapi import APIRouter, Request

router = APIRouter(prefix="/webhook", tags=["integrations"])

@router.post("/gmail")
async def gmail_webhook(request: Request):
    body_bytes = await request.body()
    
    try:
        # Parse JSON from raw bytes
        body_json = json.loads(body_bytes)

        # Extract and decode Base64 data
        encoded_data = body_json['message']['data']
        decoded_bytes = base64.b64decode(encoded_data)
        decoded_json = json.loads(decoded_bytes)

        # Print the decoded message
        print("Webhook triggered for Gmail:")
        print("Decoded Data:", decoded_json)
        print("Email Address:", decoded_json.get("emailAddress"))
        print("History ID:", decoded_json.get("historyId"))

    except Exception as e:
        print("Error parsing webhook payload:", e)
        return {"status": "error", "message": "Invalid webhook format"}

    return {"status": "success", "message": "Webhook received"}
