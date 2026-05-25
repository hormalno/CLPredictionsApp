import client from './client';
import type { Match, MatchDetail } from '../types';

export const getMatches = () =>
    client.get<Match[]>('/matches/').then(res => res.data);

export const getMatch = (id: number) =>
    client.get<MatchDetail>(`/matches/${id}/`).then(res => res.data);

export const getUpcomingMatches = () =>
    client.get<Match[]>('/matches/upcoming/').then(res => res.data);

export const getResults = () =>
    client.get<Match[]>('/matches/results/').then(res => res.data);

export const getGroupStageMatches = () =>
    client.get<Match[]>('/matches/group-stage/').then(res => res.data);

export const getKnockoutMatches = () =>
    client.get<Match[]>('/matches/knockout/').then(res => res.data);
