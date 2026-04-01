import { useDroppable } from '@dnd-kit/core';
import type { PlayerSummary } from '../../types/api';
import type { PositionConfig } from '../../types/team';
import PitchPlayerCard from './PitchPlayerCard';

export default function PitchSlot({
  position,
  player,
  level,
  onAssign,
  onClear,
  onLevelChange,
}: {
  position: PositionConfig;
  player: PlayerSummary | null;
  level?: number;
  onAssign?: () => void;
  onClear?: () => void;
  onLevelChange?: (level: number) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `slot-${position.key}`,
  });

  return (
    <div
      ref={setNodeRef}
      className="panel"
      style={{
        padding: '1rem',
        minHeight: '180px',
        outline: isOver ? '2px solid var(--accent)' : 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.75rem',
        }}
      >
        <h3 style={{ margin: 0 }}>{position.label}</h3>
        {player && onClear ? <button onClick={onClear}>Clear</button> : null}
      </div>

      {player && level && onLevelChange ? (
        <PitchPlayerCard
          player={player}
          level={level}
          role={position.roleType}
          onLevelChange={onLevelChange}
        />
      ) : (
        <div style={{ color: 'var(--muted)' }}>
          Drop or assign a player here to build your lineup.
        </div>
      )}
    </div>
  );
}