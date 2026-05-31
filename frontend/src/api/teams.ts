import client from './client';
import type { Team } from '../types';

export const getTeams = (): Promise<Team[]> =>
    client.get<Team[]>('/teams/').then(res => res.data);
