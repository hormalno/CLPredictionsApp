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
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <path d="m19 9-5 5-4-4-3 3"></path>
                    <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                    </svg>
                    <span className="step-number">1</span>
                </div>
                <h3 className="step-title">Make Predictions</h3>
                <p className="section-content">
                    Choose your scores for upcoming matches before kickoff.
                </p>
                </div>
                <div className="step-item">
                <div className="step-icon-wrapper">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm0 0H4.5a1 1 0 0 1 0-5H6"></path>
                    <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978m7-7.318v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978M18 9h1.5a1 1 0 0 0 0-5H18M4 22h16"></path>
                    </svg>
                    <span className="step-number">2</span>
                </div>
                <h3 className="step-title">Earn Score Points</h3>
                <p className="section-content">
                    Get points for correct outcomes and exact scorelines.
                </p>
                </div>
                <div className="step-item">
                <div className="step-icon-wrapper">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                    </svg>
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