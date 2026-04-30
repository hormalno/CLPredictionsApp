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

export type MatchUserScore = {
    match: number;
    username: string;
    points: number;
}

export type MatchUserPrediction = {
    id: number;
    username: string;
    home_team_score: number;
    away_team_score: number;
    points: number;
    correct_outcome: boolean | null;
    is_finished: boolean;
}