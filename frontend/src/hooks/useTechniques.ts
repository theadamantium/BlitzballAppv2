import { useEffect, useState } from 'react';
import { fetchTechniques } from '../api/techniques';
import type { Technique } from '../types/api';

export function useTechniques() {
  const [techniques, setTechniques] = useState<Technique[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTechniques()
      .then(setTechniques)
      .catch((err) => setError(err.message || 'Failed to load techniques'))
      .finally(() => setLoading(false));
  }, []);

  return { techniques, loading, error };
}