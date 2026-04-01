import type { PlayerSummary } from '../../types/api';
import PlayerCard from './PlayerCard';

export default function PlayerGrid({
  players,
  level,
  roster,
  isRosterFull,
  onAdd,
  onRemove,
}: {
  players: PlayerSummary[];
  level: number;
  roster: number[];
  isRosterFull: boolean;
  onAdd: (playerId: number) => void;
  onRemove: (playerId: number) => void;
}) {
  return (
    <div className="card-grid">
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          level={level}
          isRostered={roster.includes(player.id)}
          isRosterFull={isRosterFull}
          onAdd={() => onAdd(player.id)}
          onRemove={() => onRemove(player.id)}
        />
      ))}
    </div>
  );
}