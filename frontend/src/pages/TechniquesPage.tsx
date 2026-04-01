import { useMemo, useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import SearchInput from '../components/common/SearchInput';
import EmptyState from '../components/common/EmptyState';
import TechniqueGrid from '../components/techniques/TechniqueGrid';
import { useTechniques } from '../hooks/useTechniques';

export default function TechniquesPage() {
  const { techniques, loading, error } = useTechniques();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return techniques.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));
  }, [techniques, search]);

  return (
    <div>
      <PageHeader 
        title="Techniques" 
        subtitle="Search the technique pool and review each move in a cleaner card-based layout." 
      />
      <div className="controls-row">
        <SearchInput value={search} onChange={setSearch} placeholder="Search techniques by name" />
      </div>
      {loading ? <div>Loading techniques...</div> : null}
      {error ? <div>{error}</div> : null}
      {!loading && !error && filtered.length === 0 ? (
        <EmptyState title="No techniques found" body="Try a different search to find another Blitzball technique." />
      ) : null}
      {!loading && !error && filtered.length > 0 ? <TechniqueGrid techniques={filtered} /> : null}
    </div>
  );
}