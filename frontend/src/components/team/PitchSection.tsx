import type { PlayerSummary } from '../../types/api';
import type { PositionKey } from '../../types/team';
import { POSITIONS } from '../../utils/positions';
import PitchSlot from './PitchSlot';

export default function PitchSection({
  playerMap,
  assignments,
  playerLevels,
  onClearSlot,
  onLevelChange,
}: {
  playerMap: Map<number, PlayerSummary>;
  assignments: Record<PositionKey, number | null>;
  playerLevels: Record<number, number>;
  onClearSlot: (position: PositionKey) => void;
  onLevelChange: (playerId: number, level: number) => void;
}) {
  return (
    <section className="panel" style={{ padding: '1rem' }}>
      <h2>Pitch</h2>

      <div
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        }}
      >
        {POSITIONS.map((position) => {
          const playerId = assignments[position.key];
          const player = playerId ? playerMap.get(playerId) ?? null : null;

          return (
            <PitchSlot
              key={position.key}
              position={position}
              player={player}
              level={playerId ? playerLevels[playerId] ?? 10 : undefined}
              onClear={() => onClearSlot(position.key)}
              onLevelChange={(level) =>
                playerId && onLevelChange(playerId, level)
              }
            />
          );
        })}
      </div>
    </section>
  );
}