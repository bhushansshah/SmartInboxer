import base64
import json
from fastapi import APIRouter, Request
from api.routes.utils.gmail import get_gmail_email
from api.routes.utils.user import get_previous_history_id, set_previous_history_id

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
        if decoded_json.get("emailAddress") is None or decoded_json.get("historyId") is None:
            return {"status": "error", "message": "Invalid webhook payload. Missing emailAddress or historyId."}
        # Print the decoded message
        print("Webhook triggered for Gmail:")
        print("Email Address:", decoded_json.get("emailAddress"))
        print("History ID:", decoded_json.get("historyId"))
        prev_history_id = await get_previous_history_id(decoded_json.get("emailAddress"))
        if prev_history_id is None:
            print("No previous history.")
            await set_previous_history_id(decoded_json.get("emailAddress"), decoded_json.get("historyId"))
            return {"status": "success", "message": "No previous history found. Updated with new history ID."}
        if prev_history_id >= decoded_json.get("historyId"):
            print("No new emails since last history ID.")
            return {"status": "success", "message": "No new emails since last history ID."}

        emails = await get_gmail_email(decoded_json.get("emailAddress"), prev_history_id)

        if not emails:
            print("No new emails found.")
            return {"status": "success", "message": "No new emails found."}

        print(f"Fetched {len(emails)} emails from Gmail.")

        for email in emails:
            print(f"Email ID: {email.email_id} Content: {email.content[:50]}...")
            # Here you can add code to process each email as needed
        
        # Update the previous history ID with the new one
        await set_previous_history_id(decoded_json.get("emailAddress"), decoded_json.get("historyId"))
    except Exception as e:
        print("Error parsing webhook payload:", e)
        return {"status": "error", "message": str(e)}

    return {"status": "success", "message": "Webhook received"}