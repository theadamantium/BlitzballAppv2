export interface PlayerSummary {
  id: number;
  name: string;
  location: string;
  starting_team: string;
}

export interface PlayerStats {
  level: number;
  is_exact: boolean;
  clamped_low: boolean;
  clamped_high: boolean;
  interpolated_between: [number, number] | null;
  hp: number;
  speed: number;
  endurance: number;
  attack: number;
  pass_stat: number;
  block: number;
  shot: number;
  catch: number;
}

export interface PlayerStatsResponse {
  player_id: number;
  name: string;
  stats: PlayerStats;
}

export type RoleType = 'goalie' | 'defense' | 'midfield' | 'forward';

export interface RoleFitResponse {
  player_id: number;
  name: string;
  role: RoleType;
  level: number;
  score: number;
  percentile: number;
  grade: 'green' | 'blue' | 'red' | string;
}

export interface Technique {
  id: number;
  name: string;
  hp_cost: number | null;
  chance: string | null;
  description: string | null;
}