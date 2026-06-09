import type {PlayerSummary} from './player';

export type Goal = {
    id: number;
    goalscorer: PlayerSummary,
    assist_player: PlayerSummary | null,
    team_scored: string,
    minute: number;
    is_penalty: boolean;
    is_own_goal: boolean;
}

export type GoalPayload = {
    goalscorer: number;
    assist_player?: number | null;
    team_scored: number;
    minute: number;
    is_penalty: boolean;
};