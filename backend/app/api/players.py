from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import Player

router = APIRouter(prefix="/api/players", tags=["players"])

@router.get("")
def list_players(db: Session = Depends(get_db)):
    players = db.query(Player).order_by(Player.name).all()
    return [
        {
            "id": p.id,
            "name": p.name,
            "location": p.location,
            "starting_team": p.starting_team,
        }
        for p in players
    ]