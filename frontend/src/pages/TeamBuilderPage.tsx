import { useMemo, useState } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import TeamBuilderControls from '../components/team/TeamBuilderControls';
import PitchSection from '../components/team/PitchSection';
import BenchSection from '../components/team/BenchSection';
import ScoutingReport from '../components/team/ScoutingReport';
import { usePlayers } from '../hooks/usePlayers';
import { useRoster } from '../hooks/useRoster';
import { getPlayerIdFromDragId, getPositionFromDropId, isBenchDropId } from '../utils/dnd';
import type { PositionKey } from '../types/team';

const Pitch = PitchSection as unknown as any;

export default function TeamBuilderPage() {
  const { players, loading, error } = usePlayers();
  const roster = useRoster();
  const [activePosition, setActivePosition] = useState<PositionKey | null>(null);
  const playerMap = useMemo(() => new Map(players.map((p) => [p.id, p])),
    [players]);
  const benchPlayers = roster.benchPlayerIds.map((id) =>
    playerMap.get(id)).filter(Boolean);
  
  function handleDragEnd(event: DragEndEvent) {
    const activeId = String(event.active.id);
    const overId = event.over ? String(event.over.id) : null;
    if (!overId) return;
    
    const playerId = getPlayerIdFromDragId(activeId);
    if (!playerId) return;
    
    const targetPosition = getPositionFromDropId(overId);
    if (targetPosition) {
        roster.assignPlayer(targetPosition, playerId);
        return;
    }
    
    if (isBenchDropId(overId)) {
        const currentPosition = roster.getPlayerPosition(playerId);
        if (currentPosition) {
            roster.assignPlayer(currentPosition, null);
            }
        }
    }
  
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
        <DndContext onDragEnd={handleDragEnd}>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <Pitch
            playerMap={playerMap}
            assignments={roster.state.assignments}
            playerLevels={roster.state.playerLevels}
            onClearSlot={(position: PositionKey) => roster.assignPlayer(position, null)}
            onLevelChange={roster.setPlayerLevel}
            onAssign={(pos: PositionKey) => setActivePosition(pos)}
          />
          <BenchSection
            players={benchPlayers as any}
            onRemove={roster.removeFromRoster}
            onAssign={(player) => {
              if (activePosition) {
                roster.assignPlayer(activePosition, player.id);
                setActivePosition(null);
              } else {
                alert("Please click an 'Assign' slot on the pitch first!");
            }
            }}
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
        </DndContext>
      ) : null}
    </div>
  );
}