import { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { PlayerSummary } from '../types/player';
import PlayerCard from '../components/PlayerCard';

interface Props {
  onAdd: (p: PlayerSummary) => void;
  isFull: boolean;
  currentRosterIds: number[];
}

export default function PlayerExplorerPage({ onAdd, isFull, currentRosterIds }: Props) {
  const [players, setPlayers] = useState<PlayerSummary[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/api/players').then((res) => setPlayers(res.data));
  }, []);

  const filtered = players.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Blitzball Player Explorer</h1>
      <input
        placeholder="Search players by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ 
          padding: '0.5rem', 
          width: '300px', 
          marginBottom: '2rem', 
          borderRadius: '4px', 
          border: '1px solid #ccc' 
        }}
      />
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {filtered.map((player) => {
          const isOnTeam = currentRosterIds.includes(player.id);
          const canAdd = !isFull && !isOnTeam;

          return (
            <div key={player.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <PlayerCard player={player} />
              
              <button 
                disabled={!canAdd}
                onClick={() => onAdd(player)}
                style={{ 
                  marginTop: '8px', 
                  padding: '10px', 
                  cursor: canAdd ? 'pointer' : 'not-allowed',
                  backgroundColor: isOnTeam ? '#28a745' : isFull ? '#6c757d' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  transition: 'background-color 0.2s'
                }}
              >
                {isOnTeam ? '✓ In Roster' : isFull ? 'Roster Full (12/12)' : 'Add to Bench'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}