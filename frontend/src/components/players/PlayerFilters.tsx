import SearchInput from '../common/SearchInput';

export default function PlayerFilters({
  search,
  onSearch,
  team,
  onTeam,
  level,
  onLevel,
  teams,
  levels,
}: {
  search: string;
  onSearch: (value: string) => void;
  team: string;
  onTeam: (value: string) => void;
  level: number;
  onLevel: (value: number) => void;
  teams: string[];
  levels: number[];
}) {
  return (
    <div className="controls-row">
      <SearchInput 
        value={search} 
        onChange={onSearch} 
        placeholder="Search players by name" 
      />
      <select value={team} onChange={(e) => onTeam(e.target.value)}>
        <option value="">All Teams</option>
        {teams.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <select value={level} onChange={(e) => onLevel(Number(e.target.value))}>
        {levels.map((l) => (
          <option key={l} value={l}>Level {l}</option>
        ))}
      </select>
    </div>
  );
}