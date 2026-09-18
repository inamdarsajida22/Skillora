from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Proposal

router = APIRouter()


# Get proposals for a project
@router.get("/project/{project_id}")
def get_project_proposals(
    project_id: int,
    db: Session = Depends(get_db)
):
    proposals = (
        db.query(Proposal)
        .filter(Proposal.project_id == project_id)
        .order_by(Proposal.id.desc())
        .all()
    )

    return {
        "success": True,
        "proposals": [
            {
                "id": proposal.id,
                "project_id": proposal.project_id,
                "student_id": proposal.student_id,
                "message": proposal.message,
                "bid_amount": proposal.bid_amount,
                "status": proposal.status
            }
            for proposal in proposals
        ]
    }


# Get student's proposals
@router.get("/student/{student_id}")
def get_student_proposals(
    student_id: int,
    db: Session = Depends(get_db)
):
    proposals = (
        db.query(Proposal)
        .filter(Proposal.student_id == student_id)
        .order_by(Proposal.id.desc())
        .all()
    )

    return {
        "success": True,
        "proposals": [
            {
                "id": proposal.id,
                "project_id": proposal.project_id,
                "student_id": proposal.student_id,
                "message": proposal.message,
                "bid_amount": proposal.bid_amount,
                "status": proposal.status
            }
            for proposal in proposals
        ]
    }


# Submit proposal
@router.post("/")
def create_proposal(
    project_id: int,
    student_id: int,
    message: str = "",
    bid_amount: str = "",
    db: Session = Depends(get_db)
):
    existing = (
        db.query(Proposal)
        .filter(
            Proposal.project_id == project_id,
            Proposal.student_id == student_id
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="You have already applied to this project"
        )

    new_proposal = Proposal(
        project_id=project_id,
        student_id=student_id,
        message=message.strip(),
        bid_amount=bid_amount.strip(),
        status="pending"
    )

    db.add(new_proposal)
    db.commit()
    db.refresh(new_proposal)

    return {
        "success": True,
        "message": "Proposal submitted successfully",
        "proposal": {
            "id": new_proposal.id,
            "project_id": new_proposal.project_id,
            "student_id": new_proposal.student_id,
            "message": new_proposal.message,
            "bid_amount": new_proposal.bid_amount,
            "status": new_proposal.status
        }
    }
    # Withdraw application
@router.put("/{proposal_id}/withdraw")
def withdraw_proposal(
    proposal_id: int,
    db: Session = Depends(get_db)
):
    proposal = (
        db.query(Proposal)
        .filter(Proposal.id == proposal_id)
        .first()
    )

    if not proposal:
        raise HTTPException(
            status_code=404,
            detail="Proposal not found"
        )

    if proposal.status == "withdrawn":
        return {
            "success": True,
            "message": "Application already withdrawn"
        }

    proposal.status = "withdrawn"

    db.commit()
    db.refresh(proposal)

    return {
        "success": True,
        "message": "Application withdrawn successfully",
        "proposal": {
            "id": proposal.id,
            "project_id": proposal.project_id,
            "student_id": proposal.student_id,
            "message": proposal.message,
            "bid_amount": proposal.bid_amount,
            "status": proposal.status
        }
    }
    # Update proposal status
@router.put("/{proposal_id}/status")
def update_proposal_status(
    proposal_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    proposal = (
        db.query(Proposal)
        .filter(Proposal.id == proposal_id)
        .first()
    )

    if not proposal:
        raise HTTPException(
            status_code=404,
            detail="Proposal not found"
        )

    allowed_statuses = ["pending", "shortlisted", "rejected"]

    if status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid status"
        )

    proposal.status = status

    db.commit()
    db.refresh(proposal)

    return {
        "success": True,
        "message": f"Proposal {status} successfully",
        "proposal": {
            "id": proposal.id,
            "project_id": proposal.project_id,
            "student_id": proposal.student_id,
            "message": proposal.message,
            "bid_amount": proposal.bid_amount,
            "status": proposal.status
        }
    }