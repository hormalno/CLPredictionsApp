import client from './client';
import type { Player, TopScorerEntry } from '../types';

export const getPlayersByTeam = (teamId: number) =>
    client.get<Player[]>(`/players/?team=${teamId}`).then(res => res.data);

export const getTopGoalScorers = () =>
    client.get<TopScorerEntry[]>('/players/top-scorers/').then(res => res.data);
