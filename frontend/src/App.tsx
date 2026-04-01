import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import PlayersPage from './pages/PlayersPage';
import TeamBuilderPage from './pages/TeamBuilderPage';
import TechniquesPage from './pages/TechniquesPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<PlayersPage />} />
          <Route path="/team-builder" element={<TeamBuilderPage />} />
          <Route path="/techniques" element={<TechniquesPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}