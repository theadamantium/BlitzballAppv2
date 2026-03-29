from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, selectinload
from app.db import get_db
from app.models import Player
from app.services.interpolation import estimate_stats

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

@router.get("/{player_id}/stats")
def get_player_stats(player_id: int, level: int, db: Session = Depends(get_db)):
    # 1. Fetch player and their snapshots. 
    # 'selectinload' ensures we get the stats in one efficient query.
    player = (
        db.query(Player)
        .options(selectinload(Player.stat_snapshots))
        .filter(Player.id == player_id)
        .first()
    )
    
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    
    if not 1 <= level <= 99:
        raise HTTPException(status_code=400, detail="Level must be between 1 and 99")
    
    # 2. Run the interpolation math
    stats = estimate_stats(player.stat_snapshots, level)
    
    return {
        "player_id": player.id,
        "name": player.name,
        "stats": stats
    }

from app.services.scoring import weighted_score, percentile_rank, grade_from_percentile

@router.get("/{player_id}/role-fit")
def get_player_role_fit(player_id: int, level: int, role: str, db: Session = Depends(get_db)):
    if role not in ["goalie", "defense", "forward", "midfield"]:
        raise HTTPException(status_code=400, detail="Invalid role")

    # 1. Get all players to build the "population"
    all_players = db.query(Player).options(selectinload(Player.stat_snapshots)).all()
    
    # 2. Find our specific player in that list
    target_player = next((p for p in all_players if p.id == player_id), None)
    if not target_player:
        raise HTTPException(status_code=404, detail="Player not found")

    # 3. Calculate scores for everyone at this level
    population_scores = []
    target_score = 0
    
    for p in all_players:
        p_stats = estimate_stats(p.stat_snapshots, level)
        p_score = weighted_score(p_stats, role)
        population_scores.append(p_score)
        
        if p.id == player_id:
            target_score = p_score

    # 4. Calculate final rank and grade
    percentile = percentile_rank(target_score, population_scores)
    grade = grade_from_percentile(percentile)

    return {
        "player_id": target_player.id,
        "name": target_player.name,
        "role": role,
        "level": level,
        "score": round(target_score, 2),
        "percentile": round(percentile, 2),
        "grade": grade
    }