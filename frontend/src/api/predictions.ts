import client from './client';
import type { MatchUserPrediction,  MatchPrediction, MatchUserScore } from '../types/prediction';

export const getUserPredictions = (): Promise<MatchPrediction[]> =>
    client.get<MatchPrediction[]>('/predictions/me/').then(res => res.data);

export const submitPrediction = (matchId: number, homeScore: number, awayScore: number) =>
    client.post('/predictions/submit/', {
        match: matchId,
        home_team_score: homeScore,
        away_team_score: awayScore,
    });

export const getAllMatchUserScores = (limit?: number) =>
    client.get<MatchUserScore[]>('/match-scores/', { params: limit ? { limit } : undefined }).then(res => res.data)

export const getMatchUserPredictions = (id: number) => 
    client.get<MatchUserPrediction[]>(`/matches/${id}/predictions/`).then(res => res.data);


