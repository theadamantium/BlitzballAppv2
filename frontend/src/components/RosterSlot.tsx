import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { getGrade, ROLE_WEIGHTS } from '../services/scoring';
import type { PlayerSummary, PlayerStats } from '../types/player';

interface Props {
  player?: PlayerSummary | null;
  role: string;      // 'forward', 'midfield', 'defense', 'goalie'
  label: string;     // 'LF', 'RF', 'MD', 'LD', 'RD', 'GL'
  teamLevel: number;
  onMove: (player: PlayerSummary, target: string) => void;
}

export default function RosterSlot({ player, role, label, teamLevel, onMove }: Props) {
  const [stats, setStats] = useState<PlayerStats | null>(null);

  useEffect(() => {
    if (player) {
      api.get(`/api/players/${player.id}/stats`, { params: { level: teamLevel } })
        .then((res) => setStats(res.data.stats))
        .catch((err) => console.error("Stat fetch failed", err));
    }
  }, [player, teamLevel]);

  // Helper to determine if a stat is important for this specific role
  const isImportant = (statName: string) => {
    const weights = (ROLE_WEIGHTS as any)[role];
    return weights && weights[statName] !== undefined;
  };

  const grade = stats ? getGrade(stats, role) : '-';

  return (
    <div style={{
      width: '180px',
      background: player ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.2)',
      border: player ? '2px solid #00d2ff' : '2px dashed rgba(255,255,255,0.4)',
      borderRadius: '12px',
      padding: '10px',
      color: '#333',
      textAlign: 'center',
      boxShadow: player ? '0 4px 15px rgba(0,0,0,0.3)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      {/* UPPER PORTION */}
      <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#666', marginBottom: '2px' }}>{label}</div>
      {player ? (
        <>
          <div style={{ fontWeight: 'bold', fontSize: '1rem', borderBottom: '1px solid #eee', pb: '5px' }}>{player.name}</div>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '8px 0' }}>
            <div style={{ fontSize: '0.8rem' }}>HP: <span style={{ fontWeight: 'bold' }}>{stats?.hp || '...'}</span></div>
            <div style={{ 
              fontSize: '1.4rem', 
              fontWeight: '900', 
              color: grade === 'S' ? '#ffac33' : '#007bff' 
            }}>{grade}</div>
          </div>

          {/* STATS GRID (6-way) */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            fontSize: '0.75rem', 
            gap: '2px',
            background: '#f8f9fa',
            padding: '5px',
            borderRadius: '6px'
          }}>
            <StatRow label="SPD" value={stats?.speed} important={isImportant('speed')} />
            <StatRow label="END" value={stats?.endurance} important={isImportant('endurance')} />
            <StatRow label="ATK" value={stats?.attack} important={isImportant('attack')} />
            <StatRow label="PAS" value={stats?.pass_stat} important={isImportant('pass_stat')} />
            <StatRow label="SHT" value={stats?.shot} important={isImportant('shot')} />
            <StatRow label="CAT" value={stats?.catch} important={isImportant('catch')} />
          </div>

          {/* ACTION PORTION */}
          <div style={{ marginTop: '10px' }}>
            <select 
              style={{ fontSize: '0.7rem', width: '100%', padding: '4px' }}
              onChange={(e) => onMove(player, e.target.value)}
              value={label}
            >
              <option value="LF">Move to LF</option>
              <option value="RF">Move to RF</option>
              <option value="MD">Move to MD</option>
              <option value="LD">Move to LD</option>
              <option value="RD">Move to RD</option>
              <option value="GL">Move to GL</option>
              <option value="bench">Move to Bench</option>
            </select>
          </div>
        </>
      ) : (
        <div style={{ padding: '20px 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>OPEN SLOT</div>
      )}
    </div>
  );
}

// Small helper component for the stat rows
function StatRow({ label, value, important }: { label: string, value?: number, important: boolean }) {
  return (
    <div style={{ 
      color: important ? '#007bff' : '#666', 
      fontWeight: important ? 'bold' : 'normal',
      textAlign: 'left',
      padding: '1px 4px'
    }}>
      {label}: {value || '--'}
    </div>
  );
}