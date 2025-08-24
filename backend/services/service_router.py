from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ..database import db, models
from . import schema, hashing, token, user_service

router = APIRouter(
    tags=['Authentication']
)

# User Registration Endpoint
@router.post("/register", response_model=schema.User, status_code=status.HTTP_201_CREATED)
def register_user(user: schema.UserCreate, db: Session = Depends(db.get_db)):
    db_user = user_service.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return user_service.create_user(db=db, user=user)

# User Login Endpoint
@router.post("/login", response_model=schema.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(db.get_db)):
    user = user_service.get_user_by_email(db, email=form_data.username)
    if not user or not hashing.Hash.verify(user.hashed_password, form_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = token.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}