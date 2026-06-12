export type Team = {
    id: number;
    name: string;
    short_name: string;
    logo: string;
    group_name: string;
};

export type TeamGoalStats = Team & {
    total_goals: number;
    total_assists: number;
};
