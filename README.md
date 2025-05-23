# 🧠 SmartInboxer

SmartInboxer is an intelligent assistant that connects with your Gmail account to help you stay mentally organized and focused. It classifies incoming emails into user-defined categories using Large Language Models (LLMs) — saving time and reducing mental clutter.

---

## 🚀 Primitive Feature

### ✉️ Gmail Email Categorization (MVP)

When a user receives a new email in Gmail, SmartInboxer triggers a classification pipeline:
1. **Detects new email** via Google Gmail API + Pub/Sub.
2. **Fetches email content** securely.
3. **Classifies the email** into one or more user-defined categories using an LLM (like OpenAI or Gemini).
4. **Returns the result** to the frontend, where the user can view categorized emails.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React + Vite |
| **Backend** | Python (FastAPI) |
| **OAuth2 Authentication** | Google OAuth 2.0 |
| **Email Data** | Gmail API |
| **Event Triggering** | Google Cloud Pub/Sub |
| **Webhook Endpoint** | REST API endpoint (receives Gmail change notifications) |
| **LLM Integration** | OpenAI / Gemini for email classification |
| **Database** | MongoDB to store user tokens and labels |

---

## 📦 Features (Planned)

- [x] OAuth 2.0 authentication with Gmail
- [x] Real-time email trigger using Gmail + Pub/Sub
- [x] Email fetching and history tracking
- [x] LLM-powered email labeling
- [ ] User dashboard to view categorized emails
- [ ] Settings to manage categories and preferences
- [ ] Data privacy and secure token storage

---

## 🧠 How It Works

```plaintext
[Gmail Inbox] 
     |
     | (New Email)
     v
[Gmail API Watch + Pub/Sub]
     |
     | (Notification with historyId)
     v
[Webhook Endpoint (Python Backend)]
     |
     | (Fetches full email using Gmail API)
     v
[LLM Classifier]
     |
     | (Returns labels like "Urgent", "Work", etc.)
     v
[Frontend UI (React)]
```
