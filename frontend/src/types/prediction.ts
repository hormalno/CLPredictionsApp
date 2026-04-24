export type Prediction = {
    id: number;
    match_id: number;
    correct_outcome: boolean;
    correct_home_score: boolean;
    correct_away_score: boolean;
    points: number;
};
