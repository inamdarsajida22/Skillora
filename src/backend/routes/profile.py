from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import StudentProfile

router = APIRouter()


# =========================
# GET STUDENT PROFILE
# =========================
@router.get("/{user_id}")
def get_profile(
    user_id: int,
    db: Session = Depends(get_db)
):
    profile = (
        db.query(StudentProfile)
        .filter(StudentProfile.user_id == user_id)
        .first()
    )

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return {
        "success": True,
        "profile": {
            "id": profile.id,
            "user_id": profile.user_id,
            "name": profile.name,
            "about": profile.about,
            "education": profile.education
        }
    }


# =========================
# CREATE / UPDATE PROFILE
# =========================
@router.post("/{user_id}")
def save_profile(
    user_id: int,
    name: str,
    about: str = "",
    education: str = "Bachelor / College Student",
    db: Session = Depends(get_db)
):
    profile = (
        db.query(StudentProfile)
        .filter(StudentProfile.user_id == user_id)
        .first()
    )

    # Update existing profile
    if profile:
        profile.name = name
        profile.about = about
        profile.education = education

        db.commit()
        db.refresh(profile)

        return {
            "success": True,
            "message": "Profile updated successfully",
            "profile": {
                "id": profile.id,
                "user_id": profile.user_id,
                "name": profile.name,
                "about": profile.about,
                "education": profile.education
            }
        }

    # Create new profile
    new_profile = StudentProfile(
        user_id=user_id,
        name=name,
        about=about,
        education=education
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return {
        "success": True,
        "message": "Profile created successfully",
        "profile": {
            "id": new_profile.id,
            "user_id": new_profile.user_id,
            "name": new_profile.name,
            "about": new_profile.about,
            "education": new_profile.education
        }
    }