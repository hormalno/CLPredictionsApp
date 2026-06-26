import { useEffect, useState } from 'react';
import { getUserMatchPredictions, getUserKnockoutPredictions } from '../../../api';
import { getUserGroupPredictions } from '../../../api/predictions';
import type { MatchPrediction, KnockoutPrediction, GroupPrediction } from '../../../types';
import SummaryCard from '../summary-card/SummaryCard';
import './PredictionSummary.css';

const calcGroupStats = (predictions: MatchPrediction[]) => {
    const total = predictions.length;
    const finished = predictions.filter(p => p.correct_outcome !== null);
    const correct = finished.filter(p => p.correct_outcome).length;
    const accuracy = finished.length > 0 ? Math.round((correct / finished.length) * 100) : 0;
    const points = predictions.reduce((acc, p) => acc + p.points, 0);
    return { total, correct, accuracy, points };
};

const calcGroupWinnerStats = (predictions: GroupPrediction[]) => {
    const total = predictions.length;
    const finished = predictions.filter(p => p.group_winner_correct !== null);
    const correct = finished.filter(p => p.group_winner_correct).length;
    const accuracy = finished.length > 0 ? Math.round((correct / finished.length) * 100) : 0;
    const points = predictions.reduce((acc, p) => acc + p.points, 0);
    return { total, correct, accuracy, points };
};

const calcKnockoutStats = (predictions: KnockoutPrediction[]) => {
    const total = predictions.length;
    const finished = predictions.filter(p => p.winner_correct !== null);
    const correct = finished.filter(p => p.winner_correct).length;
    const accuracy = finished.length > 0 ? Math.round((correct / finished.length) * 100) : 0;
    const points = predictions.reduce((acc, p) => acc + p.points, 0);
    return { total, correct, accuracy, points };
};

type Props = {
    summary_type: 'match' | 'knockout' | 'group';
}

const PredictionSummary = ({ summary_type }: Props) => {
    const [matchPredictions, setMatchPredictions] = useState<MatchPrediction[]>([]);
    const [knockoutPredictions, setKnockoutPredictions] = useState<KnockoutPrediction[]>([]);
    const [groupPredictions, setGroupPredictions] = useState<GroupPrediction[]>([]);

    useEffect(() => {
        getUserMatchPredictions().then(setMatchPredictions).catch(() => {});
        getUserKnockoutPredictions().then(setKnockoutPredictions).catch(() => {});
        getUserGroupPredictions().then(setGroupPredictions).catch(() => {});
    }, []);

    const matchStats = calcGroupStats(matchPredictions);
    const knockoutStats = calcKnockoutStats(knockoutPredictions);
    const groupWinnerStats = calcGroupWinnerStats(groupPredictions);

    const stats = summary_type === 'match' ? matchStats
        : summary_type === 'group' ? groupWinnerStats
        : knockoutStats;

    return (
        <section className="summary-section">
            <div className="summary-section-container">
                <div className="summary-section-grid">
                    <SummaryCard variant="activity" label="Total Predictions" value={`${stats.correct} / ${stats.total}`} meta="All-time activity" />
                    <SummaryCard variant="points" label="Total Points" value={stats.points} meta="Current points gained" />
                    <SummaryCard variant="accuracy" label="Accuracy Rate" value={`${stats.accuracy}%`} progress={stats.accuracy} />
                </div>
            </div>
        </section>
    );
};

export default PredictionSummary;
