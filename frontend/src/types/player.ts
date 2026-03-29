export interface PlayerSummary {
  id: number;
  name: string;
  location: string;
  starting_team: string;
}

export interface PlayerStats {
  hp: number;
  speed: number;
  endurance: number;
  attack: number;
  pass_stat: number;
  block: number;
  shot: number;
  catch: number;
}