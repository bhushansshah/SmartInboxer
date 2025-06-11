from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from api.routes import auth, integrations, labels
app = FastAPI()

@app.exception_handler(Exception)
async def http_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"status": "fail", "message": str(exc)}
    )


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
