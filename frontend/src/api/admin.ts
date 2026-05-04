import client from "./client";

export const submitMatch = (matchId: number, homeScore: number, awayScore: number) =>
    client.post(`/match/${matchId}/save`, {
        match: matchId,
        home_team_score: homeScore,
        away_team_score: awayScore,
    });