import type { Team } from './team';

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

export type KnockoutPredictionMatchDetail = {
    id: number;
    date: string;
    location: string;
    round: string;
    home_team: Team | null;
    away_team: Team | null;
    home_placeholder: string;
    away_placeholder: string;
    is_closed: boolean;
};

export type KnockoutPrediction = {
    id: number;
    match: number;
    match_detail: KnockoutPredictionMatchDetail;
    predicted_home_team: Team | null;
    predicted_away_team: Team | null;
    predicted_winner: Team | null;
    home_team_correct: boolean | null;
    away_team_correct: boolean | null;
    winner_correct: boolean | null;
    points: number;
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

export type KnockoutMatchUserPrediction = {
    id: number;
    username: string;
    predicted_home_team: import('./team').Team | null;
    predicted_away_team: import('./team').Team | null;
    predicted_winner: import('./team').Team | null;
    home_team_correct: boolean | null;
    away_team_correct: boolean | null;
    winner_correct: boolean | null;
    points: number;
    is_finished: boolean;
}