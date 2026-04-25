import client from './client';
import type { Match } from '../types';

export const getMatches = () =>
    client.get<Match[]>('/matches/').then(res => res.data);

export const getMatch = (id: number) =>
    client.get<Match>(`/matches/${id}/`).then(res => res.data);
