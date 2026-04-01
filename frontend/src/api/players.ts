import { api } from './client';
import type { PlayerSummary, PlayerStatsResponse, RoleFitResponse } from '../types/api';

export async function fetchPlayers(): Promise<PlayerSummary[]> {
  const res = await api.get('/api/players');
  return res.data;
}

export async function fetchPlayerStats(
  playerId: number,
  level: number
): Promise<PlayerStatsResponse> {
  const res = await api.get(`/api/players/${playerId}/stats`, {
    params: { level },
  });
  return res.data;
}

export async function fetchPlayerRoleFit(
  playerId: number,
  level: number,
  role: string
): Promise<RoleFitResponse> {
  const res = await api.get(`/api/players/${playerId}/role-fit`, {
    params: { level, role },
  });
  return res.data;
}