from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import models, db
from .ai import ai_router
from .services import service_router
import uvicorn

# Create database tables
models.Base.metadata.create_all(bind=db.engine)

app = FastAPI(
    title="Personalized Study Assistant API",
    description="Backend services for the Study AI application.",
    version="1.0.0",
)

# CORS (Cross-Origin Resource Sharing)
# This allows your frontend (on a different port) to communicate with this backend.
origins = [
    "http://localhost:3000",  
    "http://localhost:5173",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(ai_router.router)
app.include_router(service_router.router)

@app.get("/", tags=['Root'])
def read_root():
    return {"message": "Welcome to the Study AI API!"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)