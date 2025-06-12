from fastapi import APIRouter, Depends
from api.core.dependencies import verify_user_logged_in, get_auth_tokens
from adapters.db.mongodb.user_repository import mongo_user_repository
from schemas.user import User
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials

router = APIRouter(prefix="/integrations", tags=["integrations"])

@router.post("/connect/gmail")
async def connect_gmail(payload: dict, user: User = Depends(verify_user_logged_in), tokens: dict = Depends(get_auth_tokens)):
    """
    Connects the user's Gmail account to the application by setting up a watch on the Gmail inbox.
    Args:
        payload (dict): The request payload containing necessary data.
        user (User): The currently logged-in user.
        tokens (dict): The authentication tokens for the user.
    Returns:
        dict: A response indicating the success or failure of the connection.
    """
    access_token = tokens.get('access_token')
    if not access_token:
        return {"status": "error", "message": "Access token is missing or invalid."}
    
    creds = Credentials(token=access_token)
    service = build('gmail', 'v1', credentials=creds)

    request_body = {
        "labelIds": ["INBOX"],
        "topicName": "projects/smartinboxer/topics/SmartInboxer-Gmail"
    }

    response = service.users().watch(userId='me', body=request_body).execute()
    if response.get('historyId', None) is None:
        return {"status": "error", "message": "Failed to connect to Gmail. Please check your permissions."}


    user_id = user.user_id
    user_data = {
        "isGmailConnected": True,
        "gmail_history_id": response.get('historyId'),
    }
    updated_user = await mongo_user_repository.update_user(user_id, user_data)

    if not updated_user:
        return {"status": "error", "message": "Failed to update user data in the database."}

    return {"status": "success", "message": "Gmail connected successfully"}

@router.post("/disconnect/gmail")
async def disconnect_gmail(payload: dict, user: User = Depends(verify_user_logged_in), tokens: dict = Depends(get_auth_tokens)):
    try:
        access_token = tokens['access_token']
        creds = Credentials(token=access_token)
        service = build('gmail', 'v1', credentials=creds)

        # Optional: stop receiving push notifications
        result = service.users().stop(userId='me').execute()
        print('Stop watch result:', result)
        # Update user's Gmail integration status in DB
        user_id = user.user_id
        user_data = {
            "isGmailConnected": False,
            "gmail_history_id": None,
        }

        updated_user = await mongo_user_repository.update_user(user_id, user_data)
        print('Updated user:', updated_user)
        if not updated_user:
            return {"status": "error", "message": "Failed to update user data in the database."}

        return {"status": "success", "message": "Gmail disconnected successfully."}
    
    except Exception as e:
        print(f"Error during Gmail disconnect: {e}")
        return {"status": "error", "message": "Failed to disconnect Gmail."}