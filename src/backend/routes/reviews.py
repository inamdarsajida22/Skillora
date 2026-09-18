from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Review

router = APIRouter()


# ================= GET REVIEWS =================

@router.get("/{user_id}")
def get_reviews(
    user_id: int,
    db: Session = Depends(get_db)
):
    reviews = (
        db.query(Review)
        .filter(Review.reviewed_user_id == user_id)
        .order_by(Review.id.desc())
        .all()
    )

    return {
        "success": True,
        "reviews": [
            {
                "id": review.id,
                "reviewer_id": review.reviewer_id,
                "reviewed_user_id": review.reviewed_user_id,
                "rating": review.rating,
                "comment": review.comment,
                "created_at": review.created_at
            }
            for review in reviews
        ]
    }


# ================= ADD REVIEW =================

@router.post("/")
def add_review(
    reviewer_id: int,
    reviewed_user_id: int,
    rating: int,
    comment: str = "",
    db: Session = Depends(get_db)
):

    if rating < 1 or rating > 5:
        raise HTTPException(
            status_code=400,
            detail="Rating must be between 1 and 5"
        )

    if reviewer_id == reviewed_user_id:
        raise HTTPException(
            status_code=400,
            detail="You cannot review yourself"
        )

    new_review = Review(
        reviewer_id=reviewer_id,
        reviewed_user_id=reviewed_user_id,
        rating=rating,
        comment=comment.strip()
    )

    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    return {
        "success": True,
        "message": "Review added successfully",
        "review": {
            "id": new_review.id,
            "reviewer_id": new_review.reviewer_id,
            "reviewed_user_id": new_review.reviewed_user_id,
            "rating": new_review.rating,
            "comment": new_review.comment,
            "created_at": new_review.created_at
        }
    }


# ================= DELETE REVIEW =================

@router.delete("/{review_id}")
def delete_review(
    review_id: int,
    db: Session = Depends(get_db)
):

    review = (
        db.query(Review)
        .filter(Review.id == review_id)
        .first()
    )

    if not review:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    db.delete(review)
    db.commit()

    return {
        "success": True,
        "message": "Review deleted successfully"
    }