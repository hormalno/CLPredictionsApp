import { useEffect, useState } from 'react';
import { getUserMatchPredictions, getUserKnockoutPredictions } from '../../../api';
import type { MatchPrediction, KnockoutPrediction } from '../../../types';
import SummaryCard from '../summary-card/SummaryCard';
import './PredictionSummary.css';

const calcGroupStats = (predictions: MatchPrediction[]) => {
    const total = predictions.length;
    const finished = predictions.filter(p => p.correct_outcome !== null);
    const correct = finished.filter(p => p.correct_outcome).length;
    const accuracy = finished.length > 0 ? Math.round((correct / finished.length) * 100) : 0;
    const points = predictions.reduce((acc, p) => acc + p.points, 0);
    return { total, accuracy, points };
};

const calcKnockoutStats = (predictions: KnockoutPrediction[]) => {
    const total = predictions.length;
    const finished = predictions.filter(p => p.winner_correct !== null);
    const correct = finished.filter(p => p.winner_correct).length;
    const accuracy = finished.length > 0 ? Math.round((correct / finished.length) * 100) : 0;
    const points = predictions.reduce((acc, p) => acc + p.points, 0);
    return { total, accuracy, points };
};

type Props = {
    summary_type : 'match' | 'knockout';
}

const PredictionSummary = ({summary_type} : Props) => {
    const [matchPredictions, setMatchPredictions] = useState<MatchPrediction[]>([]);
    const [knockoutPredictions, setKnockoutPredictions] = useState<KnockoutPrediction[]>([]);

    useEffect(() => {
        getUserMatchPredictions().then(setMatchPredictions).catch(() => {});
        getUserKnockoutPredictions().then(setKnockoutPredictions).catch(() => {});
    }, []);

    const group = calcGroupStats(matchPredictions);
    const knockout = calcKnockoutStats(knockoutPredictions);

    return (
        <section className="summary-section">
            <div className="summary-section-container">
                {summary_type === 'match' ?
                    (<div className="summary-section-grid">
                        <SummaryCard variant="activity" label="Total Predictions" value={group.total} meta="All-time activity" />
                        <SummaryCard variant="points" label="Total Points" value={group.points} meta="Current points gained" />
                        <SummaryCard variant="accuracy" label="Accuracy Rate" value={`${group.accuracy}%`} progress={group.accuracy} />
                    </div>)
                :
                    (<div className="summary-section-grid">
                        <SummaryCard variant="activity" label="Total Predictions" value={knockout.total} meta="All-time activity" />
                        <SummaryCard variant="points" label="Total Points" value={knockout.points} meta="Current points gained" />
                        <SummaryCard variant="accuracy" label="Accuracy Rate" value={`${knockout.accuracy}%`} progress={knockout.accuracy} />
                    </div>)}
            </div>
        </section>
    );
};

export default PredictionSummary;
