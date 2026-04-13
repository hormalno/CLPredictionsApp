import { Link } from 'react-router-dom';
import './Results.css';

const Results = () => {
    return (
        <section className="results-snapshot-section">
            <div className="results-snapshot-container">
            <h2 className="section-title">Recent Results Snapshot</h2>
            <p className="section-subtitle">
                Compact list of latest match results and how friends scored.
            </p>
            <div className="results-rail">
                <Link className="result-card" to="#">
                <div className="result-header">
                    <span>Premier League</span>
                </div>
                <div className="result-score">
                    <span>ARS</span>
                    <span className="score-number">2 - 1</span>
                    <span>LIV</span>
                </div>
                <div className="friend-scores">
                    <div className="friend-score-item">
                    <span className="friend-name">Alex</span>
                    <span className="friend-points">+10 pts</span>
                    </div>
                    <div className="friend-score-item">
                    <span className="friend-name">Jordan</span>
                    <span className="friend-points">+3 pts</span>
                    </div>
                </div>
                </Link>
                <Link className="result-card" to="#">
                <div className="result-header">
                    <span>Champions League</span>
                </div>
                <div className="result-score">
                    <span>MCY</span>
                    <span className="score-number">3 - 0</span>
                    <span>BAY</span>
                </div>
                <div className="friend-scores">
                    <div className="friend-score-item">
                    <span className="friend-name">Sam</span>
                    <span className="friend-points">+10 pts</span>
                    </div>
                    <div className="friend-score-item">
                    <span className="friend-name">Taylor</span>
                    <span className="friend-points">0 pts</span>
                    </div>
                </div>
                </Link>
                <Link className="result-card" to="#">
                <div className="result-header">
                    <span>Serie A</span>
                </div>
                <div className="result-score">
                    <span>INT</span>
                    <span className="score-number">1 - 1</span>
                    <span>JUV</span>
                </div>
                <div className="friend-scores">
                    <div className="friend-score-item">
                    <span className="friend-name">Casey</span>
                    <span className="friend-points">+5 pts</span>
                    </div>
                    <div className="friend-score-item">
                    <span className="friend-name">Riley</span>
                    <span className="friend-points">+5 pts</span>
                    </div>
                </div>
                </Link>
                <Link className="result-card" to="#">
                <div className="result-header">
                    <span>La Liga</span>
                </div>
                <div className="result-score">
                    <span>ATM</span>
                    <span className="score-number">0 - 1</span>
                    <span>VIL</span>
                </div>
                <div className="friend-scores">
                    <div className="friend-score-item">
                    <span className="friend-name">Morgan</span>
                    <span className="friend-points">+10 pts</span>
                    </div>
                    <div className="friend-score-item">
                    <span className="friend-name">Quinn</span>
                    <span className="friend-points">0 pts</span>
                    </div>
                </div>
                </Link>
            </div>
            </div>
        </section>
    );
};

export default Results;