export type PositionKey =
  | 'goalie'
  | 'leftDefense'
  | 'rightDefense'
  | 'midfield'
  | 'leftForward'
  | 'rightForward';

export interface PositionConfig {
  key: PositionKey;
  label: string;
  roleType: 'goalie' | 'defense' | 'midfield' | 'forward';
}