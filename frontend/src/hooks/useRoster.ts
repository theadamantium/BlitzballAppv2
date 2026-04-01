import { useEffect, useMemo, useState } from 'react';
import type { RosterState } from '../types/roster';
import type { PositionKey } from '../types/team';
import { readLocalStorage, writeLocalStorage } from '../utils/localStorage';

const STORAGE_KEY = 'blitzball-manager-roster';

const defaultState: RosterState = {
  roster: [],
  assignments: {
    goalie: null,
    leftDefense: null,
    rightDefense: null,
    midfield: null,
    leftForward: null,
    rightForward: null,
  },
  playerLevels: {},
};

export function useRoster() {
  const [state, setState] = useState<RosterState>(() =>
    readLocalStorage(STORAGE_KEY, defaultState)
  );

  useEffect(() => {
    writeLocalStorage(STORAGE_KEY, state);
  }, [state]);

  const rosterCount = state.roster.length;
  const isRosterFull = rosterCount >= 12;

  function addToRoster(playerId: number) {
    setState((prev) => {
      if (prev.roster.includes(playerId) || prev.roster.length >= 12) return prev;

      return {
        ...prev,
        roster: [...prev.roster, playerId],
        playerLevels: {
          ...prev.playerLevels,
          [playerId]: prev.playerLevels[playerId] ?? 10,
        },
      };
    });
  }

  function removeFromRoster(playerId: number) {
    setState((prev) => {
      const nextAssignments = { ...prev.assignments };

      (Object.keys(nextAssignments) as PositionKey[]).forEach((key) => {
        if (nextAssignments[key] === playerId) nextAssignments[key] = null;
      });

      const nextLevels = { ...prev.playerLevels };
      delete nextLevels[playerId];

      return {
        ...prev,
        roster: prev.roster.filter((id) => id !== playerId),
        assignments: nextAssignments,
        playerLevels: nextLevels,
      };
    });
  }

  function setPlayerLevel(playerId: number, level: number) {
    setState((prev) => ({
      ...prev,
      playerLevels: {
        ...prev.playerLevels,
        [playerId]: level,
      },
    }));
  }

  function assignPlayer(position: PositionKey, playerId: number | null) {
    setState((prev) => {
      const nextAssignments = { ...prev.assignments };

      if (playerId === null) {
        nextAssignments[position] = null;
        return { ...prev, assignments: nextAssignments };
      }

      const existingPosition = (Object.keys(nextAssignments) as PositionKey[]).find(
        (key) => nextAssignments[key] === playerId
      );

      if (existingPosition) {
        nextAssignments[existingPosition] = nextAssignments[position];
      }

      nextAssignments[position] = playerId;

      return {
        ...prev,
        assignments: nextAssignments,
      };
    });
  }

  function clearRoster() {
    setState(defaultState);
  }

  function getPlayerPosition(playerId: number): PositionKey | null {
    const found = (Object.keys(state.assignments) as PositionKey[]).find(
      (key) => state.assignments[key] === playerId
    );
    return found ?? null;
  }

  const benchPlayerIds = useMemo(() => {
    const assigned = new Set(Object.values(state.assignments).filter(Boolean));
    return state.roster.filter((id) => !assigned.has(id));
  }, [state.roster, state.assignments]);

  return {
    state,
    rosterCount,
    isRosterFull,
    benchPlayerIds,
    addToRoster,
    removeFromRoster,
    assignPlayer,
    setPlayerLevel,
    clearRoster,
    getPlayerPosition,
  };
}