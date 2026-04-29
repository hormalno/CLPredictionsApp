import client from './client';
import type { MatchPrediction, MatchUserScore } from '../types/prediction';

export const getUserPredictions = (): Promise<MatchPrediction[]> =>
    client.get<MatchPrediction[]>('/predictions/me/').then(res => res.data);

export const submitPrediction = (matchId: number, homeScore: number, awayScore: number) =>
    client.post('/predictions/submit/', {
        match: matchId,
        home_team_score: homeScore,
        away_team_score: awayScore,
    });

export const getMatchUserScores = () => 
    client.get<MatchUserScore[]>('/match-scores/').then(res => res.data)
