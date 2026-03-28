from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.db import Base

class Player(Base):
    __tablename__ = "players"
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    location = Column(String)
    starting_team = Column(String)
    stat_snapshots = relationship("PlayerStatSnapshot", back_populates="player", cascade="all, delete-orphan")
    key_techniques = relationship("PlayerKeyTechnique", back_populates="player", cascade="all, delete-orphan")

class PlayerStatSnapshot(Base):
    __tablename__ = "player_stat_snapshots"
    __table_args__ = (UniqueConstraint("player_id", "level", name="uq_player_level"),)
    id = Column(Integer, primary_key=True)
    player_id = Column(Integer, ForeignKey("players.id"), nullable=False)
    level = Column(Integer, nullable=False)
    hp = Column(Integer, nullable=False)
    speed = Column(Integer, nullable=False)
    endurance = Column(Integer, nullable=False)
    attack = Column(Integer, nullable=False)
    pass_stat = Column(Integer, nullable=False)
    block = Column(Integer, nullable=False)
    shot = Column(Integer, nullable=False)
    catch = Column(Integer, nullable=False)
    player = relationship("Player", back_populates="stat_snapshots")

class Technique(Base):
    __tablename__ = "techniques"
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    hp_cost = Column(Integer)
    chance = Column(String)
    description = Column(String)
    players = relationship("PlayerKeyTechnique", back_populates="technique", cascade="all, delete-orphan")

class PlayerKeyTechnique(Base):
    __tablename__ = "player_key_techniques"
    __table_args__ = (UniqueConstraint("player_id", "technique_id", name="uq_player_technique"),)
    id = Column(Integer, primary_key=True)
    player_id = Column(Integer, ForeignKey("players.id"), nullable=False)
    technique_id = Column(Integer, ForeignKey("techniques.id"), nullable=False)
    player = relationship("Player", back_populates="key_techniques")
    technique = relationship("Technique", back_populates="players")