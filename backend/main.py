from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import auth, integrations, labels
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # or ["*"] to allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(auth.router)
app.include_router(integrations.router)
app.include_router(labels.router)

@app.get("/")
def root():
    return {"message": "API is running"}
