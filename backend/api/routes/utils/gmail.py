from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from schemas.email import Email
from adapters.db.mongodb.user_repository import mongo_user_repository
from config.settings import settings
from typing import List
import base64
def get_gmail_service(user):
    """
    Initializes the Gmail API service using the user's access token.

    Args:
        user (User): The user object containing the access token.

    Returns:
        Resource: The Gmail API service resource.
    """
    if user.tokens and user.tokens.get("access_token") and user.tokens.get("refresh_token"):
        access_token = user.tokens['access_token']
        refresh_token = user.tokens['refresh_token']
    else:
        return None

    creds = Credentials(
        token=access_token,
        refresh_token=refresh_token,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=settings.google_client_id,
        client_secret=settings.google_client_secret,
        scopes=["https://www.googleapis.com/auth/gmail.readonly", "https://www.googleapis.com/auth/gmail.modify"]
    )

    # Automatically refreshes the token when it expires
    if creds.expired and creds.refresh_token:
        creds.refresh(Request())  # from google.auth.transport.requests import Request

        # Optional: store the new access token in your DB
        # user.access_token = creds.token
        
        # db.commit()

    return build('gmail', 'v1', credentials=creds)

async def get_gmail_email(email: str, prev_history_id: int) -> List[Email]:
    """
    Fetches an email from Gmail using the provided email address and history ID.
    
    Args:
        email (str): The email address to fetch the email for.
        history_id (int): The history ID of the email to fetch.

    Returns:
        Email: An Email object containing the fetched email data.
    """
    user = await mongo_user_repository.get_user_by_email(email)
    if not user:
        return None

    gmail_service = get_gmail_service(user)
    if not gmail_service:
        return None

    history_response = gmail_service.users().history().list(
            userId='me',
            startHistoryId=prev_history_id,
            historyTypes=['messageAdded']
        ).execute()

    history = history_response.get("history", [])
    print(f"Found {len(history)} history records.")
    new_message_ids = []
    for record in history:
        for added in record.get("messagesAdded", []):
            new_message_ids.append(added["message"]["id"])

    print(f"New message IDs: {new_message_ids}")

    emails = []
    for message_id in new_message_ids:
        try:
            message = gmail_service.users().messages().get(userId='me', id=message_id, format='full')
            print(f"Fetching message {message_id}...", message, type(message))
            message = message.execute()
            # print(f"Fetched message {message_id}: {message}", type(message))
        except Exception as e:
            print(f"Error fetching message {message_id}: {e}")
            continue
        # Check if the message is a draft mail
        if message.get("labelIds") and "DRAFT" in message["labelIds"]:
            print(f"Skipping draft message {message_id}.")
            continue
        print(f"Processing message ID: {message_id}")

        payload = message.get("payload", {})
        body_data = None
        if 'parts' in payload:
            for part in payload['parts']:
                if part.get('mimeType') == 'text/plain' and part.get("body", {}).get("data"):
                    body_data = base64.urlsafe_b64decode(part["body"]["data"]).decode("utf-8")
                    break
        elif payload.get("body", {}).get("data"):
            body_data = base64.urlsafe_b64decode(payload["body"]["data"]).decode("utf-8")
        # print('Body Data:', body_data)
        email = Email(
                    _id=message_id,
                    content=body_data,
                    user_id=str(user.user_id),
                )
        emails.append(email)
    return emails
        