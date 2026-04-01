import type { PositionConfig } from '../types/team';

export const POSITIONS: PositionConfig[] = [
  { key: 'goalie', label: 'Goalie', roleType: 'goalie' },
  { key: 'leftDefense', label: 'Left Defense', roleType: 'defense' },
  { key: 'rightDefense', label: 'Right Defense', roleType: 'defense' },
  { key: 'midfield', label: 'Midfield', roleType: 'midfield' },
  { key: 'leftForward', label: 'Left Forward', roleType: 'forward' },
  { key: 'rightForward', label: 'Right Forward', roleType: 'forward' },
];