import type { Team } from "./team";

export type Player = {
    id: number,
    name: string,
    position: string;
    jersey_number: number;
    team: Team;
}

export type PlayerSummary = {
    id: number;
    name: string;
}

export type TopScorerEntry = {
    id: number;
    name: string;
    position: string;
    jersey_number: number;
    team: Team;
    goal_count: number;
    assist_count: number;
}