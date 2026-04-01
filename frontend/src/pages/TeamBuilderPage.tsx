import { useMemo } from 'react';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import TeamBuilderControls from '../components/team/TeamBuilderControls';
import PitchSection from '../components/team/PitchSection';
import BenchSection from '../components/team/BenchSection';
import ScoutingReport from '../components/team/ScoutingReport';
import { usePlayers } from '../hooks/usePlayers';
import { useRoster } from '../hooks/useRoster';
import { POSITIONS } from '../utils/positions';
import type { PositionKey } from '../types/team';

export default function TeamBuilderPage() {
  const { players, loading, error } = usePlayers();
  const roster = useRoster();
  const playerMap = useMemo(() => new Map(players.map((p) => [p.id, p])),
    [players]);
  const benchPlayers = roster.benchPlayerIds.map((id) =>
    playerMap.get(id)).filter(Boolean);
  return (
    <div>
      <PageHeader
        title="Team Builder"
        subtitle="Shape your 12-player roster, place players onto the sphere
pool, and compare better fits with the scouting report."
      />
      <TeamBuilderControls onClear={roster.clearRoster} />
      {loading ? <div>Loading team builder...</div> : null}
      {error ? <div>{error}</div> : null}
      {!loading && !error && roster.state.roster.length === 0 ? (
        <EmptyState
          title="Your roster is empty"
          body="Head to the Players page, add up to 12 players, then return here to build
your lineup."
        />
      ) : null}
      {!loading && !error && roster.state.roster.length > 0 ? (
        <div style={{ display: 'grid', gap: '1rem' }}>
          <PitchSection
            playerMap={playerMap}
            assignments={roster.state.assignments}
            playerLevels={roster.state.playerLevels}
            onClearSlot={(position: PositionKey) => roster.assignPlayer(position, null)}
            onLevelChange={roster.setPlayerLevel}
          />
          <BenchSection
            players={benchPlayers as any}
            onRemove={roster.removeFromRoster}
          />
          <ScoutingReport
            players={players}
            assignments={roster.state.assignments}
            playerLevels={roster.state.playerLevels}
            roster={roster.state.roster}
            isRosterFull={roster.isRosterFull}
            addToRoster={roster.addToRoster}
          />
        </div>
      ) : null}
    </div>
  );
}