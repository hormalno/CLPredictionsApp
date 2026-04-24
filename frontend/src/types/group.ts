export type GroupTeam = {
    id: number;
    name: string;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
};

export type Group = {
    name: string;
    teams: GroupTeam[];
};
