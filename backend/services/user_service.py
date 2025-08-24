from sqlalchemy.orm import Session
from ..database import models
from . import schema, hashing

def create_user(db: Session, user: schema.UserCreate):
    hashed_password = hashing.Hash.bcrypt(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()