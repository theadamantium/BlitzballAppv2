import json
from pathlib import Path
from sqlalchemy import select
from app.db import SessionLocal
from app.models import Player, PlayerStatSnapshot, Technique, PlayerKeyTechnique

# Look for data in /app/data (Docker) or ../../../data (Local)
possible_paths = [
    Path("/app/data"),
    Path(__file__).resolve().parents[3] / "data",
    Path(__file__).resolve().parents[2] / "data"
]

DATA_DIR = None
for p in possible_paths:
    if p.exists():
        DATA_DIR = p
        break

if not DATA_DIR:
    print(f"DEBUG: Searched in {possible_paths}")
    raise FileNotFoundError("Could not find data directory in any standard location.")

print(f"INFO: Seeding from {DATA_DIR}")

def load_json(path: Path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def main():
    db = SessionLocal()
    try:
        players_data = load_json(DATA_DIR / "players.json")["players"]
        techniques_data = load_json(DATA_DIR / "techniques.json")["techniques"]

        technique_map = {}
        for tech in techniques_data:
            name = tech["technique_name"].strip()
            existing = db.execute(
                select(Technique).where(Technique.name == name)
            ).scalar_one_or_none()
            if existing:
                technique_obj = existing
            else:
                raw_hp_cost = tech.get("hp_cost")
                try:
                    hp_cost = int(raw_hp_cost) if raw_hp_cost else None
                except (ValueError, TypeError):
                    # Some techniques have non-numeric hp_cost like "see description"
                    # Store as None since we can't represent it as an integer
                    hp_cost = None

                technique_obj = Technique(
                    name=name,
                    hp_cost=hp_cost,
                    chance=tech.get("chance"),
                    description=tech.get("description"),
                )
                db.add(technique_obj)
                db.flush()
            technique_map[name] = technique_obj

        for item in players_data:
            name = item["name"].strip()
            player = db.execute(
                select(Player).where(Player.name == name)
            ).scalar_one_or_none()
            if not player:
                player = Player(
                    name=name,
                    location=item.get("location"),
                    starting_team=item.get("starting_team"),
                )
                db.add(player)
                db.flush()

            existing_levels = {
                row[0]
                for row in db.execute(
                    select(PlayerStatSnapshot.level).where(
                        PlayerStatSnapshot.player_id == player.id
                    )
                ).all()
            }

            # Deduplicate stats by level, keeping the last occurrence
            stats_by_level = {}
            for stat in item.get("stats", []):
                stats_by_level[stat["level"]] = stat

            for level, stat in stats_by_level.items():
                if level in existing_levels:
                    continue
                db.add(
                    PlayerStatSnapshot(
                        player_id=player.id,
                        level=level,
                        hp=stat["HP"],
                        speed=stat["speed"],
                        endurance=stat["endurance"],
                        attack=stat["attack"],
                        pass_stat=stat["pass"],
                        block=stat["block"],
                        shot=stat["shot"],
                        catch=stat["catch"],
                    )
                )

            existing_technique_ids = {
                row[0]
                for row in db.execute(
                    select(PlayerKeyTechnique.technique_id).where(
                        PlayerKeyTechnique.player_id == player.id
                    )
                ).all()
            }

            for tech_name in item.get("key_techniques", []):
                technique = technique_map.get(tech_name.strip())
                if technique and technique.id not in existing_technique_ids:
                    db.add(
                        PlayerKeyTechnique(
                            player_id=player.id,
                            technique_id=technique.id
                        )
                    )

        db.commit()
        print("Seed complete")
    finally:
        db.close()

if __name__ == "__main__":
    main()