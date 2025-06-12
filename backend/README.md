# Smart Inboxer Backend

This is the FastAPI backend for **Smart Inboxer**, an intelligent email management system that supports:

- 🔐 Secure user authentication via Google OAuth2 (`auth-code` flow) and primitive username/password login
- 📬 Gmail push notifications using Google Pub/Sub for real-time email processing
- 🏷️ Automatic email labeling with the help of LLM agents.

User and email data are securely persisted in MongoDB.
---

## 🚀 Features

- 🔐 Secure JWT-based authentication  
- 🧠 Google OAuth 2.0 login integration  
- 🧾 Primitive username/password login  
- 📨 Gmail integration with push notifications via Google Pub/Sub  
- 🏷️ Intelligent email labeling system  
- ☁️ MongoDB-based persistence

---

## 🧱 Technologies Used


- [FastAPI](https://fastapi.tiangolo.com/) — backend framework
- [Pydantic](https://docs.pydantic.dev/) — data validation
- [pydantic-settings](https://pydantic-docs.helpmanual.io/usage/settings/) — environment variable management
- [python-dotenv](https://pypi.org/project/python-dotenv/) — environment file loading
- [motor](https://motor.readthedocs.io/) — async MongoDB client
- [pymongo](https://pymongo.readthedocs.io/) — MongoDB interactions
- [passlib[bcrypt]](https://passlib.readthedocs.io/en/stable/) — password hashing
- [python-jose](https://python-jose.readthedocs.io/) — JWT token management
- [httpx](https://www.python-httpx.org/) — async HTTP requests
- [google-auth](https://google-auth.readthedocs.io/) — Google OAuth & ID token verification
- [google-api-python-client](https://googleapis.dev/python/google-api-python-client/latest/index.html) — Gmail API integration
- [uvicorn](https://www.uvicorn.org/) — ASGI server for FastAPI

---

## 📦 Installation

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/SmartInboxer.git
cd SmartInboxer/backend
```

### 2. Create virtual environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the server

```bash
uvicorn main:app --reload
```

By default, server runs at http://localhost:8000

## 🌐 Expose Local Server (Gmail Webhook Setup)
To receive Gmail push notifications via Google Cloud Pub/Sub, your webhook endpoint must be publicly accessible. You can achieve this using ngrok.

### 5. Start ngrok
In a separate terminal, run:

```bash
ngrok http 8000
```

This will give you a public HTTPS URL (e.g. https://abc123.ngrok.io).

### 6. Update Webhook URL in Google Cloud Console
1. Go to the Google Cloud Pub/Sub console.

2. Navigate to your subscription.

3. Edit the Push endpoint and update it to:

```
https://your-ngrok-subdomain.ngrok.io/gmail/webhook
```

Make sure /webhook/gmail matches the route defined in your FastAPI backend.
