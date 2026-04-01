import { useEffect, useMemo, useState } from 'react';
import EmptyState from '../common/EmptyState';
import type { PlayerSummary, RoleFitResponse } from '../../types/api';
import type { PositionConfig, PositionKey } from '../../types/team';
import { POSITIONS } from '../../utils/positions';
import { fetchPlayerRoleFit } from '../../api/players';
import GradeBadge from '../common/GradeBadge';
import StatusBadge from './StatusBadge';
export default function ScoutingReport({
  players,
  assignments,
  playerLevels,
  roster,
  isRosterFull,
  addToRoster,
}: {
  players: PlayerSummary[];
  assignments: Record<PositionKey, number | null>;
  playerLevels: Record<number, number>;
  roster: number[];
  isRosterFull: boolean;
  addToRoster: (playerId: number) => void;
}) {
  const [selectedPosition, setSelectedPosition] =
    useState<PositionKey>('goalie');
  const [results, setResults] = useState<(RoleFitResponse & {
    player:
    PlayerSummary
  })[]>([]);
  const [loading, setLoading] = useState(false);
  const occupiedPositions = POSITIONS.filter((p) => assignments[p.key] !==
    null);
  const activePosition = POSITIONS.find((p) => p.key === selectedPosition) ||
    POSITIONS[0];
  const activePlayerId = assignments[selectedPosition];
  const activeLevel = activePlayerId ? playerLevels[activePlayerId] ?? 10 : 10;
  useEffect(() => {
    if (!activePlayerId) {
      setResults([]);
      return;
    }
    setLoading(true);
    Promise.all(
      players.map(async (player) => {
        const fit = await fetchPlayerRoleFit(player.id, activeLevel,
          activePosition.roleType);
        return { ...fit, player };
      })
    )
      .then((all) => {
        const topSix = [...all].sort((a, b) => b.score - a.score).slice(0, 6);
        setResults(topSix);
      })
      .finally(() => setLoading(false));
  }, [players, activePlayerId, activeLevel, activePosition.roleType]);
  const playerToPosition = useMemo(() => {
    const map = new Map<number, PositionKey>();
    Object.entries(assignments).forEach(([position, playerId]) => {
      if (playerId) map.set(playerId, position as PositionKey);
    });
    return map;
  }, [assignments]);
  if (occupiedPositions.length === 0) {
    return (
      <section className="panel" style={{ padding: '1rem' }}>
        <h2>Scouting Report</h2>
        <EmptyState
          title="Scouting report inactive"
          body="Place a player on the pitch first, then select that position to
compare top candidates across the player pool."
        />
      </section>
    );
  }
  return (
    <section className="panel" style={{ padding: '1rem' }}>
      <h2>Scouting Report</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Position{' '}
          <select value={selectedPosition} onChange={(e) =>
            setSelectedPosition(e.target.value as PositionKey)}>
            {occupiedPositions.map((position) => (
              <option key={position.key} value={position.key}>{position.label}</
              option>
            ))}
          </select>
        </label>
      </div>
      {loading ? <div>Calculating top candidates...</div> : null}
      {!loading ? (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {results.map((item) => {
            const isCurrent = item.player.id === activePlayerId;
            const isRostered = roster.includes(item.player.id);
            const position = playerToPosition.get(item.player.id);
            let status = 'Available';
            if (isCurrent) status = 'Current';
            else if (position) status = 'In Another Position';
            else if (isRostered) status = 'On Bench';
            return (
              <div key={item.player.id} className="panel" style={{
                padding:
                  '0.9rem', display: 'flex', justifyContent: 'space-between', gap: '1rem',
                alignItems: 'center'
              }}>
                <div>
                  <strong>{item.player.name}</strong>
                  <div style={{
                    marginTop: '0.4rem', display: 'flex', gap:
                      '0.5rem', flexWrap: 'wrap'
                  }}>
                    <GradeBadge grade={item.grade} />
                    <StatusBadge label={status} />
                    <span>Score: {item.score}</span>
                    <span>Percentile: {item.percentile.toFixed(1)}</span>
                  </div>
                </div>
                <div>
                  {!isCurrent && !isRostered ? (
                    <button onClick={() => addToRoster(item.player.id)}
                      disabled={isRosterFull}>
                      {isRosterFull ? 'Roster Full' : 'Add to Bench'}
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}