export type MatchPrediction = {
    id: number;
    match: number;
    outcome: string;
    home_team_score: number;
    away_team_score: number;
    points: number;
    correct_outcome: boolean | null;
    correct_home_team_score: boolean | null;
    correct_away_team_score: boolean | null;
};