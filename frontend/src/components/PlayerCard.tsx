import { useState, useEffect } from 'react';
import { api } from '../api/client';
import type { PlayerSummary, PlayerStats } from '../types/player';

interface Props {
  player: PlayerSummary;
}

export default function PlayerCard({ player }: Props) {
  // Implementation detail: Add local level state, default 1 to 10
  const [level, setLevel] = useState(10);
  const [stats, setStats] = useState<PlayerStats | null>(null);

// 1. We added the /api back (because 200 proved it was the right path)
// 2. We switched to BACKTICKS ` ` so ${player.id} works
// 3. We changed res.data to res.data.stats to find the actual numbers
useEffect(() => {
api.get(`/api/players/${player.id}/stats`, { params: { level } })
    .then((res) => {
    setStats(res.data.stats); // Look inside the "stats" property
    })
    .catch((err) => console.error("Stat fetch failed", err));
}, [player.id, level]);

    return (
    <div style={{ border: '1px solid #444', borderRadius: '8px', padding: '1rem', backgroundColor: '#f9f9f9' }}>
        <h3 style={{ marginTop: 0 }}>{player.name}</h3>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>{player.starting_team} | {player.location}</p>
        
        <div style={{ margin: '1rem 0', textAlign: 'center' }}>
        <label>Level: </label>
        <input 
            type="number" 
            min="1" 
            max="99" 
            value={level} 
            onChange={(e) => setLevel(parseInt(e.target.value) || 1)}
            style={{ width: '50px', padding: '4px' }}
        />
        
        {/* HP is now safely inside the check and centered below the selector */}
        {stats && (
            <div style={{ marginTop: '8px', fontWeight: 'bold', fontSize: '1rem' }}>
            HP: {stats.hp}
            </div>
        )}
        </div>

        {stats ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontSize: '0.8rem', gap: '4px' }}>
            <div>SPD: {stats.speed}</div>
            <div>END: {stats.endurance}</div>
            <div>ATK: {stats.attack}</div>
            <div>Pass: {stats.pass_stat}</div>
            <div>Shot: {stats.shot}</div>
            <div>Catch: {stats.catch}</div>
        </div>
        ) : (
        <p style={{ textAlign: 'center' }}>Loading stats...</p>
        )}
    </div>
    );
}