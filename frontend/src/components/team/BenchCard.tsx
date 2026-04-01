import type { PlayerSummary } from '../../types/api';

export default function BenchCard({ player, onRemove }: { player: PlayerSummary; onRemove: () => void; }) {
  return (
    <div className="panel" style={{ padding: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <strong>{player.name}</strong>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}