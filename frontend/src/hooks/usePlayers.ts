import { useEffect, useState } from 'react';
import { fetchPlayers } from '../api/players';
import type { PlayerSummary } from '../types/api';

export function usePlayers() {
  const [players, setPlayers] = useState<PlayerSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlayers()
      .then(setPlayers)
      .catch((err) => setError(err.message || 'Failed to load players'))
      .finally(() => setLoading(false));
  }, []);

  return { players, loading, error };
}