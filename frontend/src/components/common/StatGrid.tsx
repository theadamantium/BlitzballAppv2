import type { PlayerStats } from '../../types/api';

export default function StatGrid({ stats }: { stats: PlayerStats }) {
  return (
    <div className="stat-grid">
      <div className="stat-item" style={{ background: 'rgba(255, 255, 255, 0.2)', fontWeight: '600' }}>
        <strong>HP</strong><br />{stats.hp}
      </div>
      <div className="stat-item" style={{ background: 'rgba(255, 255, 255, 0.2)', fontWeight: '600' }}>
        <strong>Speed</strong><br />{stats.speed}
      </div>
      <div className="stat-item" style={{ background: 'rgba(255, 255, 255, 0.2)', fontWeight: '600' }}>
        <strong>Shot</strong><br />{stats.shot}
      </div>
      <div className="stat-item" style={{ background: 'rgba(255, 255, 255, 0.2)', fontWeight: '600' }}>
        <strong>End</strong><br />{stats.endurance}
      </div>
      <div className="stat-item" style={{ background: 'rgba(255, 255, 255, 0.2)', fontWeight: '600' }}>
        <strong>Pass</strong><br />{stats.pass_stat}
      </div>
      <div className="stat-item" style={{ background: 'rgba(255, 255, 255, 0.2)', fontWeight: '600' }}>
        <strong>Att</strong><br />{stats.attack}
      </div>
      <div className="stat-item" style={{ background: 'rgba(255, 255, 255, 0.2)', fontWeight: '600' }}>
        <strong>Blk</strong><br />{stats.block}
      </div>
      <div className="stat-item" style={{ background: 'rgba(255, 255, 255, 0.2)', fontWeight: '600' }}>
        <strong>Catch</strong><br />{stats.catch}
      </div>
    </div>
  );
}