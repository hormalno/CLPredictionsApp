import './PredictionHeader.css';

const PredictionHeader = () => {
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
            </div>
        </section>
    );
};

export default PredictionHeader;