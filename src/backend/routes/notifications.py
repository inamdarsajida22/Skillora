from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Notification

router = APIRouter()


# Get notifications
@router.get("/{user_id}")
def get_notifications(user_id: int, db: Session = Depends(get_db)):
    notifications = (
        db.query(Notification)
        .filter(Notification.user_id == user_id)
        .order_by(Notification.id.desc())
        .all()
    )

    return {
        "success": True,
        "notifications": [
            {
                "id": n.id,
                "user_id": n.user_id,
                "message": n.message,
                "notification_type": n.notification_type,
                "is_read": n.is_read,
                "created_at": n.created_at,
            }
            for n in notifications
        ],
    }


# Add notification
@router.post("/")
def add_notification(
    user_id: int,
    message: str,
    notification_type: str = "general",
    db: Session = Depends(get_db),
):
    if not message.strip():
        raise HTTPException(
            status_code=400,
            detail="Notification message is required"
        )

    new_notification = Notification(
        user_id=user_id,
        message=message.strip(),
        notification_type=notification_type,
        is_read=0,
    )

    db.add(new_notification)
    db.commit()
    db.refresh(new_notification)

    return {
        "success": True,
        "message": "Notification added successfully",
        "notification": {
            "id": new_notification.id,
            "user_id": new_notification.user_id,
            "message": new_notification.message,
            "notification_type": new_notification.notification_type,
            "is_read": new_notification.is_read,
        },
    }


# Mark notification as read
@router.put("/{notification_id}/read")
def mark_as_read(
    notification_id: int,
    db: Session = Depends(get_db)
):
    notification = (
        db.query(Notification)
        .filter(Notification.id == notification_id)
        .first()
    )

    if not notification:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    notification.is_read = 1
    db.commit()
    db.refresh(notification)

    return {
        "success": True,
        "message": "Notification marked as read"
    }


# Delete notification
@router.delete("/{notification_id}")
def delete_notification(
    notification_id: int,
    db: Session = Depends(get_db)
):
    notification = (
        db.query(Notification)
        .filter(Notification.id == notification_id)
        .first()
    )

    if not notification:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    db.delete(notification)
    db.commit()

    return {
        "success": True,
        "message": "Notification deleted successfully"
    }