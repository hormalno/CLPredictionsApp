import client from './client';
import type { MatchUserPrediction, MatchPrediction, MatchUserScore, KnockoutPrediction } from '../types/prediction';

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

export const submitKnockoutPrediction = (data: {
    match: number;
    predicted_home_team?: number | null;
    predicted_away_team?: number | null;
    predicted_winner?: number | null;
}) => client.post('/predictions/knockout/submit/', data);

export const submitTopScorerPrediction = (playerId: number) =>
    client.post('/predictions/top-scorer/submit/', { player: playerId });

export const getUserTopScorerPrediction = (): Promise<{ prediction: { id: number; player: import('../types').Player; player_correct: boolean | null } | null; tournament_locked: boolean }> =>
    client.get('/predictions/top-scorer/me/').then(res => res.data);


