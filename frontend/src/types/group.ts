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
    slot_p1: 'home' | 'away';
    next_p2: number;
    slot_p2: 'home' | 'away';
    next_p3: number[];
    slot_p3: 'home' | 'away';
    teams: GroupTeam[];
};
