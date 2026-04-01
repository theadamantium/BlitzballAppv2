import { api } from './client';
import type { Technique } from '../types/api';

export async function fetchTechniques(): Promise<Technique[]> {
  const res = await api.get('/api/techniques');
  return res.data;
}