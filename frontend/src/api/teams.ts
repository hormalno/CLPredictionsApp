import client from './client';
import type { Team, TeamGoalStats } from '../types';

export const getTeams = (): Promise<Team[]> =>
    client.get<Team[]>('/teams/').then(res => res.data);

export const getTopTeamGoalStats = (): Promise<TeamGoalStats[]> =>
    client.get<TeamGoalStats[]>('/teams/top-scorers/').then(res => res.data);
