from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import models
from ..services import auth,schema
from . import ai_service


router = APIRouter(
    prefix="/ai",
    tags=['AI Services'],
    dependencies=[Depends(auth.get_current_user)]
)

@router.post("/generate-content")
def create_content(request: schema.ContentRequest, current_user: models.User = Depends(auth.get_current_user)):
    # The current_user dependency is re-declared here to make the user object available in the function if needed
    return ai_service.generate_study_content(request)

@router.post("/chat")
def chat_with_assistant(request: schema.ChatRequest, current_user: models.User = Depends(auth.get_current_user)):
    """
    Provides a conversational endpoint for the personal assistant.
    The user must be authenticated to use this endpoint.
    """
    return ai_service.get_chat_response(request)