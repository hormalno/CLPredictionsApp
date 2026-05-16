import client from "./client";

export const submitMatch = (matchId: number, homeScore: number, awayScore: number) =>
    client.post(`/matches/${matchId}/submit-result/`, {
        match: matchId,
        score_home_team: homeScore,
        score_away_team: awayScore,
    });

export const createGoal = (matchId: number, data: {
    goalscorer: number;
    assist_player?: number | null;
    team_scored: number;
    minute: number;
    is_penalty: boolean;
}) => client.post(`/matches/${matchId}/add-goal/`, data).then(res => res.data);
