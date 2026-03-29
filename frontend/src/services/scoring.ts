import type { PlayerStats } from '../types/player';

export const ROLE_WEIGHTS = {
  forward: { shot: 1.0, endurance: 1.0, pass_stat: 0.5 },
  midfield: { pass_stat: 1.0, endurance: 0.75, block: 0.75, shot: 0.5, attack: 0.5 },
  defense: { block: 1.0, attack: 1.0, pass_stat: 0.5 },
  goalie: { catch: 1.0 },
};

export function getGrade(stats: PlayerStats, role: string): string {
  const weights = (ROLE_WEIGHTS as any)[role];
  let score = 0;
  let maxPossible = 0;

  for (const [stat, weight] of Object.entries(weights)) {
    score += (stats as any)[stat] * (weight as number);
    maxPossible += 100 * (weight as number); // Assuming 100 is "Max" for grading
  }

  const percentage = (score / maxPossible) * 100;
  if (percentage > 85) return 'S';
  if (percentage > 70) return 'A';
  if (percentage > 55) return 'B';
  return 'C';
}