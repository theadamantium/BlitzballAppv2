import type { Technique } from '../../types/api';

export default function TechniqueCard({ technique }: { technique: Technique }) {
  return (
    <div className="panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <h3 style={{ margin: 0 }}>{technique.name}</h3>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span className="grade-badge grade-badge--blue">HP Cost: {technique.hp_cost ?? '—'}</span>
        <span className="grade-badge grade-badge--green">Chance: {technique.chance ?? '—'}</span>
      </div>
      <p style={{ margin: 0, color: 'var(--muted)' }}>{technique.description || 'No description available.'}</p>
    </div>
  );
}