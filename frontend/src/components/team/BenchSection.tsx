import { useDroppable } from '@dnd-kit/core';
import EmptyState from '../common/EmptyState';
import type { PlayerSummary } from '../../types/api';
import BenchCard from './BenchCard';

export default function BenchSection({
  players,
  onRemove,
}: {
  players: PlayerSummary[];
  onRemove: (playerId: number) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'bench',
  });

  return (
    <section
      ref={setNodeRef}
      className="panel"
      style={{
        padding: '1rem',
        outline: isOver ? '2px solid var(--accent)' : 'none',
      }}
    >
      <h2>Bench</h2>
      {players.length === 0 ? (
        <EmptyState
          title="Bench is empty"
          body="Add players from the Players page to build your roster, then place them onto the sphere pool."
        />
      ) : (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {players.map((player) => (
            <BenchCard
              key={player.id}
              player={player}
              onRemove={() => onRemove(player.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}