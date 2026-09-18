from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Portfolio

router = APIRouter()


@router.get("/{user_id}")
def get_portfolio(user_id: int, db: Session = Depends(get_db)):
    projects = (
        db.query(Portfolio)
        .filter(Portfolio.user_id == user_id)
        .order_by(Portfolio.id.desc())
        .all()
    )

    return {
        "success": True,
        "projects": [
            {
                "id": project.id,
                "user_id": project.user_id,
                "title": project.title,
                "description": project.description,
                "skills": project.skills,
                "github_link": project.github_link,
                "live_link": project.live_link,
            }
            for project in projects
        ],
    }


@router.post("/")
def add_portfolio(
    user_id: int,
    title: str,
    description: str = "",
    skills: str = "",
    github_link: str = "",
    live_link: str = "",
    db: Session = Depends(get_db),
):
    if not title.strip():
        raise HTTPException(
            status_code=400,
            detail="Project title is required"
        )

    new_project = Portfolio(
        user_id=user_id,
        title=title.strip(),
        description=description.strip(),
        skills=skills.strip(),
        github_link=github_link.strip(),
        live_link=live_link.strip(),
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return {
        "success": True,
        "message": "Portfolio project added successfully",
        "project": {
            "id": new_project.id,
            "user_id": new_project.user_id,
            "title": new_project.title,
            "description": new_project.description,
            "skills": new_project.skills,
            "github_link": new_project.github_link,
            "live_link": new_project.live_link,
        },
    }


@router.delete("/{project_id}")
def delete_portfolio(project_id: int, db: Session = Depends(get_db)):
    project = (
        db.query(Portfolio)
        .filter(Portfolio.id == project_id)
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Portfolio project not found"
        )

    db.delete(project)
    db.commit()

    return {
        "success": True,
        "message": "Portfolio project deleted successfully"
    }