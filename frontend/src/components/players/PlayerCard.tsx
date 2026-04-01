import { useEffect, useState } from 'react';
import type { PlayerSummary, PlayerStatsResponse } from '../../types/api';
import { fetchPlayerStats } from '../../api/players';
import StatGrid from '../common/StatGrid';

export default function PlayerCard({
  player,
  level,
  isRostered,
  isRosterFull,
  onAdd,
  onRemove,
}: {
  player: PlayerSummary;
  level: number;
  isRostered: boolean;
  isRosterFull: boolean;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const [stats, setStats] = useState<PlayerStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPlayerStats(player.id, level)
      .then(setStats)
      .finally(() => setLoading(false));
  }, [player.id, level]);

  return (
    <div className="panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h3 style={{ margin: 0 }}>{player.name}</h3>
          <div style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>{player.starting_team}</div>
          <div style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>{player.location}</div>
        </div>
        <div>
          {isRostered ? (
            <button onClick={onRemove}>Remove from Roster</button>
          ) : (
            <button onClick={onAdd} disabled={isRosterFull}>
              {isRosterFull ? 'Roster Full' : 'Add to Roster'}
            </button>
          )}
        </div>
      </div>
      {loading ? <div>Loading stats...</div> : stats ? <StatGrid stats={stats.stats} /> : <div>Stats unavailable</div>}
    </div>
  );
}