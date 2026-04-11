import './QuickHub.css';

const QuickHub = () => {
    return (
        <section className="quick-hub-section">
                <div className="quick-hub-bg">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="https://videos.pexels.com/video-files/35898933/15226936_360_640_30fps.mp4"
                    className="quick-hub-video"
                ></video>
                <div className="quick-hub-overlay"></div>
                </div>
                <div className="quick-hub-container">
                    <div className="quick-hub-grid">
                        <div className="quick-hub-content">
                            <h1 className="hero-title">
                                Predict. Compete. Win with MatchMates.
                            </h1>
                            <p className="hero-subtitle">
                                The ultimate match prediction site for you and your friends.
                                Track scores, climb the leaderboard, and claim bragging rights.
                            </p>
                            <div className="quick-hub-actions">
                                <a href="#predictions">
                                <div className="btn btn-primary btn-lg">
                                    <span>Make a Prediction</span>
                                </div>
                                </a>
                                <a href="#leaderboard">
                                <div className="btn btn-lg btn-outline">
                                    <span>View Leaderboard</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="quick-hub-card-wrapper">
                    <div className="next-match-card">
                        <span className="next-match-label">Next Upcoming Match</span>
                        <div className="next-match-teams">
                        <div className="team">
                            <div className="team-logo">
                            <span>FCB</span>
                            </div>
                            <span className="team-name">Barcelona</span>
                        </div>
                        <div className="match-vs">
                            <span>VS</span>
                        </div>
                        <div className="team">
                            <div className="team-logo">
                            <span>RMA</span>
                            </div>
                            <span className="team-name">Real Madrid</span>
                        </div>
                        </div>
                        <div className="next-match-info">
                        <div className="match-meta">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            >
                            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                            <path d="M3 10h18"></path>
                            <path d="M8 2v4"></path>
                            <path d="M16 2v4"></path>
                            </svg>
                            <span>Tonight, 21:00</span>
                        </div>
                        </div>
                        <button className="btn btn-accent btn-xl">
                        One-Click Predict
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </section>
    );
};

export default QuickHub;