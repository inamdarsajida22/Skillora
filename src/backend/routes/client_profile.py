from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import ClientProfile

router = APIRouter()


@router.get("/{user_id}")
def get_client_profile(
    user_id: int,
    db: Session = Depends(get_db)
):
    profile = (
        db.query(ClientProfile)
        .filter(ClientProfile.user_id == user_id)
        .first()
    )

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Client profile not found"
        )

    return {
        "success": True,
        "profile": {
            "id": profile.id,
            "user_id": profile.user_id,
            "company_name": profile.company_name,
            "location": profile.location,
            "about": profile.about
        }
    }


@router.post("/{user_id}")
def save_client_profile(
    user_id: int,
    company_name: str,
    location: str = "",
    about: str = "",
    db: Session = Depends(get_db)
):
    if not company_name.strip():
        raise HTTPException(
            status_code=400,
            detail="Company name is required"
        )

    profile = (
        db.query(ClientProfile)
        .filter(ClientProfile.user_id == user_id)
        .first()
    )

    if profile:
        profile.company_name = company_name.strip()
        profile.location = location.strip()
        profile.about = about.strip()

        db.commit()
        db.refresh(profile)

        return {
            "success": True,
            "message": "Client profile updated successfully",
            "profile": {
                "id": profile.id,
                "user_id": profile.user_id,
                "company_name": profile.company_name,
                "location": profile.location,
                "about": profile.about
            }
        }

    new_profile = ClientProfile(
        user_id=user_id,
        company_name=company_name.strip(),
        location=location.strip(),
        about=about.strip()
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return {
        "success": True,
        "message": "Client profile created successfully",
        "profile": {
            "id": new_profile.id,
            "user_id": new_profile.user_id,
            "company_name": new_profile.company_name,
            "location": new_profile.location,
            "about": new_profile.about
        }
    }