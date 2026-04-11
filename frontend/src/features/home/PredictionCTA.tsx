import './PredictionCTA.css'

const PredictionCTA = () => {
    return (
        <section className="prediction-cta-section">
            <div className="prediction-cta-container">
            <div className="cta-card">
                <div className="cta-content">
                <h2 className="section-title">Ready to take the lead?</h2>
                <p className="section-content">
                    Don&apos;t miss out on the next round of matches. Place your
                    next prediction now and secure your spot on the leaderboard.
                </p>
                <a href="#predictions">
                    <div className="btn btn-primary btn-xl">
                    <span>Make a Prediction Now</span>
                    </div>
                </a>
                </div>
                <div className="cta-visual">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="120"
                    height="120"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="home-icon26"
                >
                    <path d="m12 14 4-4 4 4"></path>
                    <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                    <path d="m9.05 14.87-1.37-1.37a2 2 0 0 0-2.82 0l-1.49 1.49a2 2 0 0 0 0 2.82l2.12 2.12a2 2 0 0 0 2.82 0l1.24-1.24"></path>
                </svg>
                </div>
            </div>
            </div>
        </section>
    )
};

export default PredictionCTA;