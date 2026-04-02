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
  const renderSlot = (positionKey: PositionKey) => {
    const position = POSITIONS.find((p) => p.key === positionKey)!;
    const playerId = assignments[position.key];
    const player = playerId ? playerMap.get(playerId) ?? null : null;
    
    return (
      <PitchSlot
        key={position.key}
        position={position}
        player={player}
        level={playerId ? playerLevels[playerId] ?? 10 : undefined}
        onClear={() => onClearSlot(position.key)}
        onLevelChange={(level) => playerId && onLevelChange(playerId, level)}
      />
    );
  };

  return (
    <section className="panel" style={{ padding: '1rem' }}>
      <h2>Pitch</h2>
      
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '900px',
        margin: '2rem auto',
        maxWidth: '1000px'
      }}>
        
        {/* Top Row - Forwards */}
        <div style={{ position: 'absolute', width: '280px', left: '0', top: '0' }}>
          {renderSlot('leftForward')}
        </div>
        
        <div style={{ position: 'absolute', width: '280px', right: '0', top: '0' }}>
          {renderSlot('rightForward')}
        </div>
        
        {/* Middle Row - Midfield */}
        <div style={{ position: 'absolute', width: '280px', left: '50%', top: '220px', transform: 'translateX(-50%)' }}>
          {renderSlot('midfield')}
        </div>
        
        {/* Lower Row - Defense */}
        <div style={{ position: 'absolute', width: '280px', left: '0', top: '440px' }}>
          {renderSlot('leftDefense')}
        </div>
        
        <div style={{ position: 'absolute', width: '280px', right: '0', top: '440px' }}>
          {renderSlot('rightDefense')}
        </div>
        
        {/* Bottom - Goalie */}
        <div style={{ position: 'absolute', width: '280px', left: '50%', top: '660px', transform: 'translateX(-50%)' }}>
          {renderSlot('goalie')}
        </div>
      </div>
    </section>
  );
}