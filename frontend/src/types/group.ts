export type GroupTeam = {
    id: number;
    name: string;
    short_name: string;
    logo: string;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
};

export type Group = {
    name: string;
    next_p1: number;
    next_p2: number;
    next_p3: number;
    teams: GroupTeam[];
};
