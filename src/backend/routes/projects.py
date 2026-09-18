from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Project

router = APIRouter()


# Get all projects
@router.get("/")
def get_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).order_by(Project.id.desc()).all()

    return {
        "success": True,
        "projects": [
            {
                "id": project.id,
                "title": project.title,
                "description": project.description,
                "skills": project.skills,
                "budget": project.budget,
                "client_id": project.client_id,
                "status": project.status
            }
            for project in projects
        ]
    }


# Get single project
@router.get("/{project_id}")
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    return {
        "success": True,
        "project": {
            "id": project.id,
            "title": project.title,
            "description": project.description,
            "skills": project.skills,
            "budget": project.budget,
            "client_id": project.client_id,
            "status": project.status
        }
    }


# Add new project
@router.post("/")
def create_project(
    title: str,
    description: str,
    skills: str = "",
    budget: str = "",
    client_id: int = None,
    db: Session = Depends(get_db)
):
    if not title.strip():
        raise HTTPException(
            status_code=400,
            detail="Project title is required"
        )

    if not description.strip():
        raise HTTPException(
            status_code=400,
            detail="Project description is required"
        )

    new_project = Project(
        title=title.strip(),
        description=description.strip(),
        skills=skills.strip(),
        budget=budget.strip(),
        client_id=client_id,
        status="open"
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return {
        "success": True,
        "message": "Project created successfully",
        "project": {
            "id": new_project.id,
            "title": new_project.title,
            "description": new_project.description,
            "skills": new_project.skills,
            "budget": new_project.budget,
            "client_id": new_project.client_id,
            "status": new_project.status
        }
    }


# Delete project
@router.delete("/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(Project.id == project_id).first()

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    db.delete(project)
    db.commit()

    return {
        "success": True,
        "message": "Project deleted successfully"
    }