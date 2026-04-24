import type { Prediction } from '../types';

export const mockPredictions: Prediction[] = [
    { id: 1, match_id: 1, correct_outcome: true,  correct_home_score: true,  correct_away_score: true,  points: 10 },
    { id: 2, match_id: 2, correct_outcome: false, correct_home_score: false, correct_away_score: false, points: 0  },
    { id: 3, match_id: 3, correct_outcome: true,  correct_home_score: true,  correct_away_score: true,  points: 10 },
    { id: 4, match_id: 4, correct_outcome: true,  correct_home_score: false, correct_away_score: true,  points: 5  },
    { id: 5, match_id: 5, correct_outcome: false, correct_home_score: false, correct_away_score: false, points: 0  },
    { id: 6, match_id: 6, correct_outcome: true,  correct_home_score: true,  correct_away_score: false, points: 5  },
];
