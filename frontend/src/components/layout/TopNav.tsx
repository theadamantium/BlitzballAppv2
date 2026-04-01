import { NavLink } from 'react-router-dom';

export default function TopNav() {
  return (
    <header className="top-nav">
      <div>Blitzball Manager</div>

      <nav className="top-nav__links">
        <NavLink to="/">Players</NavLink>
        <NavLink to="/team-builder">Team Builder</NavLink>
        <NavLink to="/techniques">Techniques</NavLink>
      </nav>
    </header>
  );
}