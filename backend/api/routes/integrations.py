from fastapi import APIRouter, Depends
from api.core.dependencies import verify_user_logged_in, get_auth_tokens
from schemas.user import User
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials

router = APIRouter(prefix="/integrations", tags=["integrations"])

@router.post("/gmail")
async def connect_gmail(payload: dict, user: User = Depends(verify_user_logged_in), tokens: dict = Depends(get_auth_tokens)):
    access_token = tokens['access_token']

    creds = Credentials(token=access_token)
    service = build('gmail', 'v1', credentials=creds)

    request_body = {
        "labelIds": ["INBOX"],
        "topicName": "projects/smartinboxer/topics/SmartInboxer-Gmail"
    }

    response = service.users().watch(userId='me', body=request_body).execute()
    print("Watch response:", response)
    return {"status": "success", "message": response}