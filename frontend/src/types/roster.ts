import type { PositionKey } from './team';

export interface RosterState {
  roster: number[];
  assignments: Record<PositionKey, number | null>;
  playerLevels: Record<number, number>;
}