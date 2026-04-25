import type { Team } from './team';

export type Match = {
    id: number;
    home_team: Team;
    away_team: Team;
    score_home_team: number;
    score_away_team: number;
    date: string;
    stadium: string;
    location: string;
    round: string;
    round_display: string;
    group: string;
    group_display: string;
    is_finished: boolean;
};
