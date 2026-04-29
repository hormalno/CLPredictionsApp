import type { MatchPrediction } from '../../../types';
import SummaryCard from '../summary-card/SummaryCard';
import './PredictionSummary.css';

type Props = {
    predictions: MatchPrediction[];
};

const PredictionSummary = ({ predictions }: Props) => {
    const predictedMatches = predictions.length;
    const correct = predictions.filter(p => p.correct_outcome).length;
    const accuracy = predictedMatches > 0 ? Math.round((correct / predictedMatches) * 100) : 0;
    const points = predictions.reduce((acc, p) => acc + p.points, 0);


    return (
        <section className="summary-section">
            <div className="summary-section-container">
                <div className="summary-section-grid">
                    <SummaryCard variant="activity" label="Total Predictions" value={predictedMatches} meta="All-time activity" />
                    <SummaryCard variant="points" label="Total Points" value={points} meta="Current points gained" />                    
                    <SummaryCard variant="accuracy" label="Accuracy Rate" value={`${accuracy}%`} progress={accuracy} />
                </div>
            </div>
        </section>
    );
};

export default PredictionSummary;