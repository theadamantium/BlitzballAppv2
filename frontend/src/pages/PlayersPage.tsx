import { useMemo, useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import PlayerFilters from '../components/players/PlayerFilters';
import PlayerGrid from '../components/players/PlayerGrid';
import RosterCounter from '../components/players/RosterCounter';
import { usePlayers } from '../hooks/usePlayers';
import { useKnownLevels } from '../hooks/useKnownLevels';
import { useRoster } from '../hooks/useRoster';

export default function PlayersPage() {
  const { players, loading, error } = usePlayers();
  const levels = useKnownLevels();
  
  const [search, setSearch] = useState('');
  const [team, setTeam] = useState('');
  const [level, setLevel] = useState(10);
  const roster = useRoster();

  const teams = useMemo(
    () => [...new Set(players.map((p) => p.starting_team).filter(Boolean))].sort(),
    [players]
  );

  const filteredPlayers = useMemo(() => {
    return players.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesTeam = !team || p.starting_team === team;
      return matchesSearch && matchesTeam;
    });
  }, [players, search, team]);

  return (
    <div>
      <PageHeader 
        title="Players" 
        subtitle="Browse the full player pool, compare known level snapshots, and build your 12-player roster." 
      />
      <div className="controls-row">
        <div style={{ gridColumn: '1 / -1' }}>
          <PlayerFilters 
            search={search} 
            onSearch={setSearch} 
            team={team} 
            onTeam={setTeam} 
            level={level} 
            onLevel={setLevel} 
            teams={teams} 
            levels={levels} 
          />
        </div>
        <RosterCounter count={roster.rosterCount} />
      </div>
      {loading ? <div>Loading players...</div> : null}
      {error ? <div>{error}</div> : null}
      {!loading && !error && filteredPlayers.length === 0 ? (
        <EmptyState title="No players found" body="Try a different search or team filter to find a Blitzball player." />
      ) : null}
      {!loading && !error && filteredPlayers.length > 0 ? (
        <PlayerGrid 
          players={filteredPlayers} 
          level={level} 
          roster={roster.state.roster} 
          isRosterFull={roster.isRosterFull} 
          onAdd={roster.addToRoster} 
          onRemove={roster.removeFromRoster} 
        />
      ) : null}
    </div>
  );
}