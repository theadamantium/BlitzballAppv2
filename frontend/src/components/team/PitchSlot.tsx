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
  return (
    <div className="panel" style={{ padding: '1rem', minHeight: '180px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h4 style={{ margin: 0 }}>{position.label}</h4>
        {player ? (
          <button onClick={onClear} style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>
            Clear
          </button>
        ) : (
          <button onClick={() => onAssign && onAssign(position.key)} style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>
            Assign
          </button>
        )}
      </div>
      
      {player ? (
        <PitchPlayerCard 
          player={player} 
          level={level ?? 10} 
          role={position.roleType} 
          onLevelChange={onLevelChange ?? (() => {})} 
        />
      ) : (
        <div style={{ 
          height: '100px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          border: '2px dashed var(--border)', 
          borderRadius: '12px',
          color: 'var(--muted)'
        }}>
          Empty Slot
        </div>
      )}
    </div>
  );
}