import type { ReactNode } from 'react';
import './PredictionHeader.css';

type Props = {
    children: ReactNode;
}

const PredictionHeader = ({children} : Props) => {
    return (
        <section className="header-section">
            <div className="header-section-container">
                <div className="header-section-card">
                    <h1 className="my-predictions-hero-title hero-title">
                        <text>My Predictions</text>
                    </h1>
                    <p className="hero-subtitle">
                        <text>
                        Track your performance and upcoming match forecasts with
                        MatchMates.
                        </text>
                    </p>
                </div>
                {children}
            </div>
        </section>
    );
};

export default PredictionHeader;