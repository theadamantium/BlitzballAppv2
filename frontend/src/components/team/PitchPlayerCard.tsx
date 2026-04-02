import { useEffect, useState } from 'react';
import type { PlayerSummary, PlayerStatsResponse, RoleFitResponse } from '../../types/api';
import { fetchPlayerRoleFit, fetchPlayerStats } from '../../api/players';
import StatGrid from '../common/StatGrid';
import GradeBadge from '../common/GradeBadge';

export default function PitchPlayerCard({
  player,
  level,
  role,
  onLevelChange,
}: {
  player: PlayerSummary;
  level: number;
  role: string;
  onLevelChange: (level: number) => void;
}) {
  const [stats, setStats] = useState<PlayerStatsResponse | null>(null);
  const [fit, setFit] = useState<RoleFitResponse | null>(null);

  useEffect(() => {
    fetchPlayerStats(player.id, level).then(setStats);
    fetchPlayerRoleFit(player.id, level, role).then(setFit);
  }, [player.id, level, role]);

  const tint = fit?.grade === 'green'
    ? 'rgba(44, 212, 170, 0.25)'
    : fit?.grade === 'red'
    ? 'rgba(255, 111, 125, 0.25)'
    : 'rgba(81, 168, 255, 0.25)';

  return (
    <div 
      className="panel" 
      style={{ 
        padding: '0.9rem', 
        background: `linear-gradient(${tint}, rgba(255, 255, 255, 0.15))`,
        backdropFilter: 'blur(12px)',
        border: '2px solid rgba(255, 255, 255, 0.3)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', alignItems: 'center', marginBottom: '0.6rem' }}>
        <strong style={{ fontSize: '1.1rem' }}>{player.name}</strong>
        {fit ? <GradeBadge grade={fit.grade} /> : null}
      </div>
      <div style={{ margin: '0.6rem 0' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontWeight: '600' }}>Level</span>
          <select 
            value={level} 
            onChange={(e) => onLevelChange(Number(e.target.value))}
            style={{ 
              flex: 1,
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'var(--text)',
              fontWeight: '600'
            }}
          >
            {Array.from({ length: 99 }, (_, i) => i + 1).map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </label>
      </div>
      {stats ? <StatGrid stats={stats.stats} /> : <div>Loading...</div>}
    </div>
  );
}