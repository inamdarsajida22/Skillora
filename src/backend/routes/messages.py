from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Message

router = APIRouter()


# ================= GET CONVERSATION =================

@router.get("/{user1_id}/{user2_id}")
def get_messages(
    user1_id: int,
    user2_id: int,
    db: Session = Depends(get_db)
):
    messages = (
        db.query(Message)
        .filter(
            (
                (Message.sender_id == user1_id) &
                (Message.receiver_id == user2_id)
            )
            |
            (
                (Message.sender_id == user2_id) &
                (Message.receiver_id == user1_id)
            )
        )
        .order_by(Message.id.asc())
        .all()
    )

    return {
        "success": True,
        "messages": [
            {
                "id": message.id,
                "sender_id": message.sender_id,
                "receiver_id": message.receiver_id,
                "message": message.message,
                "created_at": message.created_at
            }
            for message in messages
        ]
    }


# ================= SEND MESSAGE =================

@router.post("/")
def send_message(
    sender_id: int,
    receiver_id: int,
    message: str,
    db: Session = Depends(get_db)
):
    if not message.strip():
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty"
        )

    new_message = Message(
        sender_id=sender_id,
        receiver_id=receiver_id,
        message=message.strip()
    )

    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return {
        "success": True,
        "message": "Message sent successfully",
        "data": {
            "id": new_message.id,
            "sender_id": new_message.sender_id,
            "receiver_id": new_message.receiver_id,
            "message": new_message.message,
            "created_at": new_message.created_at
        }
    }