import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PlayerExplorerPage from './pages/PlayerExplorerPage';
import TeamBuilderPage from './pages/TeamBuilderPage'; // We will create this file next
import type { PlayerSummary } from './types/player';

export type RosterPositions = {
  LF: PlayerSummary | null; RF: PlayerSummary | null;
  MD: PlayerSummary | null;
  LD: PlayerSummary | null; RD: PlayerSummary | null;
  GL: PlayerSummary | null;
};

export default function App() {
  const [positions, setPositions] = useState<RosterPositions>({
    LF: null, RF: null, MD: null, LD: null, RD: null, GL: null
  });
  const [bench, setBench] = useState<PlayerSummary[]>([]);

  // Calculate total count for the limit of 12
  const activeCount = Object.values(positions).filter(p => p !== null).length;
  const totalRosterCount = activeCount + bench.length;

  const addToBench = (player: PlayerSummary) => {
    const isAlreadyInRoster = bench.find(p => p.id === player.id) || 
                              Object.values(positions).find(p => p?.id === player.id);
    
    if (totalRosterCount < 12 && !isAlreadyInRoster) {
      setBench([...bench, player]);
    }
  };

  const moveToPosition = (player: PlayerSummary, targetPos: keyof RosterPositions | 'bench') => {
    // 1. Find where the player is currently (bench or a position)
    // 2. Remove them from current spot
    // 3. If target is a position and it's occupied, move incumbent to bench
    // 4. Place player in target
    
    let newPositions = { ...positions };
    let newBench = bench.filter(p => p.id !== player.id);

    // If they were in a position, clear it
    for (const pos in newPositions) {
      if (newPositions[pos as keyof RosterPositions]?.id === player.id) {
        newPositions[pos as keyof RosterPositions] = null;
      }
    }

    if (targetPos === 'bench') {
      newBench.push(player);
    } else {
      const incumbent = newPositions[targetPos];
      if (incumbent) newBench.push(incumbent);
      newPositions[targetPos] = player;
    }

    setPositions(newPositions);
    setBench(newBench);
  };

  return (
    <Router>
      <nav style={{ padding: '1rem', backgroundColor: '#222', color: 'white', display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Search ({totalRosterCount}/12)</Link>
        <Link to="/builder" style={{ color: 'white', textDecoration: 'none' }}>Team Builder</Link>
      </nav>

      <Routes>
        <Route path="/" element={
          <PlayerExplorerPage 
            onAdd={addToBench} 
            isFull={totalRosterCount >= 12} 
            currentRosterIds={[...bench, ...Object.values(positions).filter(p => p !== null)].map(p => p!.id)} 
          />
        } />
        <Route path="/builder" element={
          <TeamBuilderPage 
            positions={positions} 
            bench={bench} 
            onMove={moveToPosition}
            onRemove={(id) => setBench(bench.filter(p => p.id !== id))}
          />
        } />
      </Routes>
    </Router>
  );
}