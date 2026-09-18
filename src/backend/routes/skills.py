from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Skill

router = APIRouter()


# ================= GET SKILLS =================
@router.get("/{user_id}")
def get_skills(
    user_id: int,
    db: Session = Depends(get_db)
):
    skills = (
        db.query(Skill)
        .filter(Skill.user_id == user_id)
        .all()
    )

    return {
        "success": True,
        "skills": [
            {
                "id": skill.id,
                "user_id": skill.user_id,
                "skill_name": skill.skill_name,
                "level": skill.level
            }
            for skill in skills
        ]
    }


# ================= ADD SKILL =================
@router.post("/{user_id}")
def add_skill(
    user_id: int,
    skill_name: str,
    level: str = "Beginner",
    db: Session = Depends(get_db)
):
    if not skill_name.strip():
        raise HTTPException(
            status_code=400,
            detail="Skill name is required"
        )

    new_skill = Skill(
        user_id=user_id,
        skill_name=skill_name.strip(),
        level=level
    )

    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)

    return {
        "success": True,
        "message": "Skill added successfully",
        "skill": {
            "id": new_skill.id,
            "user_id": new_skill.user_id,
            "skill_name": new_skill.skill_name,
            "level": new_skill.level
        }
    }


# ================= DELETE SKILL =================
@router.delete("/{skill_id}")
def delete_skill(
    skill_id: int,
    db: Session = Depends(get_db)
):
    skill = (
        db.query(Skill)
        .filter(Skill.id == skill_id)
        .first()
    )

    if not skill:
        raise HTTPException(
            status_code=404,
            detail="Skill not found"
        )

    db.delete(skill)
    db.commit()

    return {
        "success": True,
        "message": "Skill deleted successfully"
    }