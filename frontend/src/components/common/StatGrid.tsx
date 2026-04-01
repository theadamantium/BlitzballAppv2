import type { PlayerStats } from '../../types/api';

export default function StatGrid({ stats }: { stats: PlayerStats }) {
    return (
        <div className="stat-grid">
            <div className="stat-item">
                <strong>HP</strong>
                <br />
                {stats.hp}
            </div>

            <div className="stat-item">
                <strong>Speed</strong>
                <br />
                {stats.speed}
            </div>

            <div className="stat-item">
                <strong>Shot</strong>
                <br />
                {stats.shot}
            </div>

            <div className="stat-item">
                <strong>End</strong>
                <br />
                {stats.endurance}
            </div>

            <div className="stat-item">
                <strong>Pass</strong>
                <br />
                {stats.pass_stat}
            </div>

            <div className="stat-item">
                <strong>Att</strong>
                <br />
                {stats.attack}
            </div>

            <div className="stat-item">
                <strong>Blk</strong>
                <br />
                {stats.block}
            </div>

            <div className="stat-item">
                <strong>Catch</strong>
                <br />
                {stats.catch}
            </div>
        </div>
    );
}