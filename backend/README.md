# Smart Inboxer Backend

This is the FastAPI backend for **Smart Inboxer**, supporting user authentication via:
- Google OAuth2 (`auth-code` flow)
- Username/Password (primitive login)

MongoDB is used as the database to store user records.

---

## 🚀 Features

- 🔐 Secure JWT-based authentication
- 🧠 Google OAuth 2.0 login integration
- 🧾 Primitive username/password login 
- ☁️ MongoDB persistence

---

## 🧱 Technologies Used

- [FastAPI](https://fastapi.tiangolo.com/)
- [httpx](https://www.python-httpx.org/)
- [python-jose](https://python-jose.readthedocs.io/) for JWT
- [google-auth](https://google-auth.readthedocs.io/) for verifying Google ID tokens
- [motor](https://motor.readthedocs.io/) for async MongoDB access
- [Pydantic](https://docs.pydantic.dev/) for validation

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

