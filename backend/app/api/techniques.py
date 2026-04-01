from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import Technique

router = APIRouter(prefix="/api/techniques", tags=["techniques"])

@router.get("")
def list_techniques(db: Session = Depends(get_db)):
    techniques = db.query(Technique).order_by(Technique.name).all()
    return [
        {
            "id": t.id,
            "name": t.name,
            "hp_cost": t.hp_cost,
            "chance": t.chance,
            "description": t.description,
        }
        for t in techniques
    ]

@router.get("/{technique_id}")
def get_technique(technique_id: int, db: Session = Depends(get_db)):
    technique = db.query(Technique).filter(Technique.id == technique_id).first()
    if not technique:
        raise HTTPException(status_code=404, detail="Technique not found")
    return {
        "id": technique.id,
        "name": technique.name,
        "hp_cost": technique.hp_cost,
        "chance": technique.chance,
        "description": technique.description,
    }