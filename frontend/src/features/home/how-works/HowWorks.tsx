import { LineChartIcon, TrophyIcon, UsersGroupIcon } from '../../../components/icons/Icons';
import './HowWorks.css'

const HowWorks = () => {
    return (
    <section className="how-works-section">
            <div className="how-works-container">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
                Three simple steps to start competing with your friends.
            </p>
            <div className="steps-horizontal">
                <div className="step-item">
                <div className="step-icon-wrapper">
                    <LineChartIcon size={32} />
                    <span className="step-number">1</span>
                </div>
                <h3 className="step-title">Make Predictions</h3>
                <p className="section-content">
                    Choose your scores for upcoming matches before kickoff.
                </p>
                </div>
                <div className="step-item">
                <div className="step-icon-wrapper">
                    <TrophyIcon size={32} />
                    <span className="step-number">2</span>
                </div>
                <h3 className="step-title">Earn Score Points</h3>
                <p className="section-content">
                    Get points for correct outcomes and exact scorelines.
                </p>
                </div>
                <div className="step-item">
                <div className="step-icon-wrapper">
                    <UsersGroupIcon size={32} />
                    <span className="step-number">3</span>
                </div>
                <h3 className="step-title">View History</h3>
                <p className="section-content">
                    Track your progress and see how you stack up against friends.
                </p>
                </div>
            </div>
            </div>
        </section>
    );
};

export default HowWorks;