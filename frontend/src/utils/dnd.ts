import type { PositionKey } from '../types/team';

export function getPlayerIdFromDragId(id: string): number | null {
    if (!id.startsWith('player-')) return null;
    const parsed = Number(id.replace('player-', ''));
    return Number.isNaN(parsed) ? null : parsed;
}

export function getPositionFromDropId(id: string): PositionKey | null {
    if (!id.startsWith('slot-')) return null;
    return id.replace('slot-', '') as PositionKey;
}

export function isBenchDropId(id: string): boolean {
    return id === 'bench';
}