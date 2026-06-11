import client from './client';
import type { MatchUserPrediction, KnockoutMatchUserPrediction, MatchPrediction, MatchUserScore, KnockoutPrediction } from '../types/prediction';

export const getUserMatchPredictions = (): Promise<MatchPrediction[]> =>
    client.get<MatchPrediction[]>('/predictions/me/').then(res => res.data);

export const getUserKnockoutPredictions = (): Promise<KnockoutPrediction[]> =>
    client.get<KnockoutPrediction[]>('/predictions/knockout/me/').then(res => res.data);

export const submitPrediction = (matchId: number, homeScore: number, awayScore: number) =>
    client.post('/predictions/submit/', {
        match: matchId,
        home_team_score: homeScore,
        away_team_score: awayScore,
    });

export const getAllMatchesUserScores = (limit?: number) =>
    client.get<MatchUserScore[]>('/matches-scores/', { params: limit ? { limit } : undefined }).then(res => res.data)

export const getUserPredictionsPerMatch = (id: number) =>
    client.get<MatchUserPrediction[]>(`/matches/${id}/predictions/`).then(res => res.data);

export const getKnockoutPredictionsPerMatch = (id: number) =>
    client.get<KnockoutMatchUserPrediction[]>(`/matches/${id}/knockout-predictions/`).then(res => res.data);

export const submitKnockoutPrediction = (data: {
    match: number;
    predicted_home_team?: number | null;
    predicted_away_team?: number | null;
    predicted_winner?: number | null;
}) => client.post('/predictions/knockout/submit/', data);

export const submitTopScorerPrediction = (playerId: number) =>
    client.post('/predictions/top-scorer/submit/', { player: playerId });

export type TopScorerPrediction = {
    id: number;
    player: import('../types').Player;
    player_correct: boolean | null;
    points: number;
};

export const getUserTopScorerPrediction = (): Promise<{ prediction: TopScorerPrediction | null; tournament_locked: boolean }> =>
    client.get('/predictions/top-scorer/me/').then(res => res.data);

export type TopTeamPrediction = {
    id: number;
    team: import('../types').Team;
    team_correct: boolean | null;
    points: number;
};

export const submitTopTeamPrediction = (teamId: number) =>
    client.post('/predictions/top-team/submit/', { team: teamId });

export const getUserTopTeamPrediction = (): Promise<{ prediction: TopTeamPrediction | null; tournament_locked: boolean }> =>
    client.get('/predictions/top-team/me/').then(res => res.data);

export const getUserGroupPredictions = (): Promise<import('../types').GroupPrediction[]> =>
    client.get('/predictions/group/me/').then(res => res.data);

export const submitGroupPrediction = (groupId: number, teamId: number) =>
    client.post('/predictions/group/submit/', { group: groupId, group_winner_predict: teamId });


