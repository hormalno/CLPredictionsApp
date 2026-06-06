import type { MatchDetail } from "../types";
import client from "./client";

export const submitMatch = (
    matchId: number,
    homeScore: number,
    awayScore: number,
    homePenalties?: number,
    awayPenalties?: number,
) =>
    client.post(`/matches/${matchId}/submit-result/`, {
        match: matchId,
        score_home_team: homeScore,
        score_away_team: awayScore,
        ...(homePenalties !== undefined && { home_penalties: homePenalties }),
        ...(awayPenalties !== undefined && { away_penalties: awayPenalties }),
    });

type GoalPayload = {
    goalscorer: number;
    assist_player?: number | null;
    team_scored: number;
    minute: number;
    is_penalty: boolean;
};

export const createGoals = (matchId: number, goals: GoalPayload[]) =>
    client.post<MatchDetail>(`/matches/${matchId}/add-goals/`, goals).then(res => res.data);

export const getAdminMatches = () =>
    client.get<MatchDetail[]>('/matches/admin-list/').then(res => res.data);
