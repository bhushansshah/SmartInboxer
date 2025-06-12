from adapters.db.mongodb.user_repository import mongo_user_repository

async def get_previous_history_id(email: str) -> int:
    """
    Fetch the previous history ID for a given email address.
    
    Args:
        email (str): The email address to fetch the history ID for.
    
    Returns:
        int: The previous history ID, or None if not found.
    """
    user = await mongo_user_repository.get_user_by_email(email)
    if not user:
        return None

    return user.gmail_history_id if user.gmail_history_id else None

async def set_previous_history_id(email: str, history_id: int) -> bool:
    """
    Set the previous history ID for a given email address.
    
    Args:
        email (str): The email address to set the history ID for.
        history_id (int): The history ID to set.
    
    Returns:
        bool: True if the operation was successful, False otherwise.
    """
    user = await mongo_user_repository.get_user_by_email(email)
    if not user:
        return False

    updated_user_data = {"gmail_history_id": history_id}
    updated_user = await mongo_user_repository.update_user(user.user_id, updated_user_data)
    
    return updated_user is not None
