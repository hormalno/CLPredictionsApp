import type { Group, GroupTeam } from '../types';

export type { Group, GroupTeam };

export const mockGroups: Group[] = [
    {
        name: "Group A",
        teams: [
            { id: 1, name: "The Predictors",  wins: 12, draws: 2, losses: 1,  goalsFor: 7, goalsAgainst: 5,  points: 38 },
            { id: 2, name: "Goal Seekers",     wins: 10, draws: 3, losses: 2,  goalsFor: 5, goalsAgainst: 4,  points: 33 },
            { id: 3, name: "Match Masters",    wins: 8,  draws: 4, losses: 3,  goalsFor: 5, goalsAgainst: 5,  points: 28 },
            { id: 4, name: "Point Pickers",    wins: 6,  draws: 2, losses: 2,  goalsFor: 4, goalsAgainst: 2,  points: 20 },
        ],
    },
    {
        name: "Group B",
        teams: [
            { id: 5, name: "Score Hunters",    wins: 11, draws: 1, losses: 3,  goalsFor: 9, goalsAgainst: 4,  points: 34 },
            { id: 6, name: "Net Busters",      wins: 9,  draws: 3, losses: 3,  goalsFor: 6, goalsAgainst: 5,  points: 30 },
            { id: 7, name: "Kick Kings",       wins: 7,  draws: 2, losses: 6,  goalsFor: 5, goalsAgainst: 7,  points: 23 },
            { id: 8, name: "Final Whistle FC", wins: 3,  draws: 1, losses: 11, goalsFor: 2, goalsAgainst: 10, points: 10 },
        ],
    },
];
