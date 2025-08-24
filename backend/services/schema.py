from pydantic import BaseModel, EmailStr,Field
from typing import List

# --- User Schemas ---
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    class Config:
        from_attributes = True

# --- Token Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None
    
# --- Chat Schemas ---

class ContentRequest(BaseModel):
    topic: str
    content_type: str  # "quiz" or "flashcards"

class ChatRequest(BaseModel):
    message: str
    # You could expand this to include chat history
    
# A single multiple-choice question
class QuizQuestion(BaseModel):
    question: str = Field(description="The question text")
    options: List[str] = Field(description="A list of 4 possible answers")
    answer: str = Field(description="The correct answer from the options list")

# The complete quiz structure
class Quiz(BaseModel):
    questions: List[QuizQuestion] = Field(description="A list of 5 quiz questions")

# A single flashcard
class Flashcard(BaseModel):
    front: str = Field(description="The front of the flashcard (term or question)")
    back: str = Field(description="The back of the flashcard (definition or answer)")

# The complete flashcard deck structure
class Flashcards(BaseModel):
    flashcards: List[Flashcard] = Field(description="A list of 5 flashcards")