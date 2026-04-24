import { BarChartIcon, TrophyIcon } from '../../../components/icons/Icons';
import './PredictionSummary.css';

const PredictionSummary = () => {
    const accuracy = 30;

    return (
        <section className="summary-section">
            <div className="summary-section-container">
                <div className="summary-section-grid">
                <div className="summary-card">
                    <div className="summary-card-icon-wrapper">
                    <BarChartIcon size={24} />
                    </div>
                    <div className="summary-card-content">
                    <span className="summary-card-label">
                        <text>Total Predictions</text>
                    </span>
                    <h2 className="summary-card-value"><text>128</text></h2>
                    <p className="summary-card-meta">
                        <text>All-time activity</text>
                    </p>
                    </div>
                </div>
                <div className="summary-card accent">
                    <div className="summary-card-icon-wrapper">
                    <TrophyIcon size={24} />
                    </div>
                    <div className="summary-card-content">
                    <span className="summary-card-label">
                        <text>Accuracy Rate</text>
                    </span>
                    <h2 className="summary-card-value"><text>{accuracy}%</text></h2>
                    <div className="summary-card-progress-bar">
                        <div className="summary-card-progress-fill" style={{ width: `${accuracy}%` }}></div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
};

export default PredictionSummary;