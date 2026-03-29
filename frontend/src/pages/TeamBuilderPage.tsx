import { useState } from 'react';
import type { PlayerSummary } from '../types/player';
import RosterSlot from '../components/RosterSlot';
import { Link } from 'react-router-dom';

export default function TeamBuilderPage({ positions, bench, onMove, onRemove }: any) {
  const [teamLevel, setTeamLevel] = useState(20);

  // Responsive logic: we'll use a CSS class or inline style with media queries
  // For simplicity here, we use a container that scales everything inside it.
  const slotStyle = (top: string, left: string): React.CSSProperties => ({
    position: 'absolute',
    top,
    left,
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    width: '160px' // Slightly narrower to prevent overlap
  });

  return (
    <div style={{ 
      padding: '1rem', 
      backgroundColor: '#1a1a2e', 
      minHeight: '100vh', 
      color: 'white', 
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      
      {/* HEADER SECTION */}
      <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <h1 style={{ margin: 0 }}>Sphere Pool</h1>
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
          <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Team Level: </label>
          <input 
            type="number" min="1" max="99" 
            value={teamLevel} 
            onChange={(e) => setTeamLevel(parseInt(e.target.value) || 1)}
            style={{ width: '50px', background: 'transparent', color: 'white', border: '1px solid #444', borderRadius: '4px', padding: '4px' }}
          />
        </div>
      </div>
      
      {/* MAIN CONTENT AREA: Stacks vertically on small screens */}
      <div className="layout-container" style={{ 
        display: 'flex', 
        gap: '40px', 
        justifyContent: 'center', 
        alignItems: 'flex-start',
        width: '100%',
        maxWidth: '1200px',
        flexWrap: 'wrap' // This is the secret for mobile stacking
      }}>
        
        {/* THE SPHERE POOL WRAPPER (Prevents overflow on mobile) */}
        <div style={{ 
          position: 'relative', 
          width: 'min(90vw, 700px)', // Scale with the screen width
          height: 'min(90vw, 700px)', 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, #00d2ff 0%, #3a7bd5 100%)',
          border: '8px solid rgba(255,255,255,0.15)',
          boxShadow: '0 0 40px rgba(0,210,255,0.2)',
          flexShrink: 0,
          overflow: 'visible'
        }}>
          {/* ENEMY GOAL (TOP) */}
          <div style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderBottom: '25px solid #ff4b2b' }} />
          
          {/* POSITIONS: Optimized coordinates to maximize space */}
          <div style={slotStyle('18%', '22%')}><RosterSlot label="LF" role="forward" player={positions.LF} teamLevel={teamLevel} onMove={onMove} /></div>
          <div style={slotStyle('18%', '78%')}><RosterSlot label="RF" role="forward" player={positions.RF} teamLevel={teamLevel} onMove={onMove} /></div>
          <div style={slotStyle('50%', '50%')}><RosterSlot label="MD" role="midfield" player={positions.MD} teamLevel={teamLevel} onMove={onMove} /></div>
          <div style={slotStyle('78%', '22%')}><RosterSlot label="LD" role="defense" player={positions.LD} teamLevel={teamLevel} onMove={onMove} /></div>
          <div style={slotStyle('78%', '78%')}><RosterSlot label="RD" role="defense" player={positions.RD} teamLevel={teamLevel} onMove={onMove} /></div>
          <div style={slotStyle('92%', '50%')}><RosterSlot label="GL" role="goalie" player={positions.GL} teamLevel={teamLevel} onMove={onMove} /></div>

          {/* HOME GOAL (BOTTOM) */}
          <div style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderTop: '25px solid #00c6ff' }} />
        </div>

        {/* THE BENCH */}
        <div style={{ 
          width: '350px', 
          background: 'rgba(255,255,255,0.05)', 
          padding: '1.5rem', 
          borderRadius: '20px', 
          border: '1px solid rgba(255,255,255,0.1)',
          maxHeight: '800px',
          overflowY: 'auto'
        }}>
          <h2 style={{ marginTop: 0 }}>Bench</h2>
          {bench.length === 0 && <p style={{ color: '#888' }}>Add players from the search page.</p>}
          {bench.map((p: any) => (
            <div key={p.id} style={{ padding: '12px', background: '#fff', color: '#333', marginBottom: '12px', borderRadius: '10px' }}>
              <strong>{p.name}</strong>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <select onChange={(e) => onMove(p, e.target.value)} defaultValue="" style={{ flex: 1, padding: '4px' }}>
                  <option value="" disabled>Assign...</option>
                  <option value="LF">LF</option><option value="RF">RF</option>
                  <option value="MD">MD</option><option value="LD">LD</option>
                  <option value="RD">RD</option><option value="GL">GL</option>
                </select>
                <button onClick={() => onRemove(p.id)} style={{ background: '#ff4b2b', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px' }}>Release</button>
              </div>
            </div>
          ))}
          <Link to="/" style={{ color: '#00d2ff', textDecoration: 'none', fontSize: '0.9rem', display: 'block', marginTop: '10px' }}>+ Find More Players</Link>
        </div>
      </div>
    </div>
  );
}