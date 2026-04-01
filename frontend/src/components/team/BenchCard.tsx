import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { PlayerSummary } from '../../types/api';
import type { PositionKey } from '../../types/team';
import { POSITIONS } from '../../utils/positions';

export default function BenchCard({
  player,
  onRemove,
  onAssign,
}: {
  player: PlayerSummary;
  onRemove: () => void;
  onAssign: (position: PositionKey) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `player-${player.id}`,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.6 : 1,
    cursor: 'grab',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="panel"
    >
      <div style={{ padding: '0.85rem', display: 'grid', gap: '0.75rem' }}>
        <strong>{player.name}</strong>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {onAssign ? (
            <select
              defaultValue=""
              onChange={(e) =>
                e.target.value && onAssign(e.target.value as PositionKey)
              }
            >
              <option value="">Assign to...</option>
              {POSITIONS.map((position) => (
                <option key={position.key} value={position.key}>
                  {position.label}
                </option>
              ))}
            </select>
          ) : null}

          <button onClick={onRemove}>Remove</button>
        </div>
      </div>
    </div>
  );
}