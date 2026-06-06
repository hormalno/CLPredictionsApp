import type { Goal } from './goal';
import type { Team } from './team';

export type Match = {
    id: number;
    match_id: number | null;
    home_team: Team | null;
    away_team: Team | null;
    home_placeholder: string;
    away_placeholder: string;
    score_home_team: number | null;
    score_away_team: number | null;
    home_penalties: number | null;
    away_penalties: number | null;
    date: string;
    stadium: string;
    location: string;
    round: string;
    round_display: string;
    group: string | null;
    group_display: string | null;
    leg: number | null;
    is_finished: boolean;
    is_closed: boolean;
};

export type MatchDetail = Match & {
    goals: Goal[];
};
