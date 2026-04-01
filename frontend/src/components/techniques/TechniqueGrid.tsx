import type { Technique } from '../../types/api';
import TechniqueCard from './TechniqueCard';

export default function TechniqueGrid({ techniques }: { techniques: Technique[] }) {
  return (
    <div className="card-grid">
      {techniques.map((technique) => (
        <TechniqueCard key={technique.id} technique={technique} />
      ))}
    </div>
  );
}