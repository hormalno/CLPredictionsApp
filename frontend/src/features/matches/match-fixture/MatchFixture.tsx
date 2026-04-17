import { useNavigate } from 'react-router-dom';
import './MatchFixture.css';

const MatchFixture = () => {
    const navigate = useNavigate();

    return (        
        <div>
            <div className="match-item">
                <div className="match-info">
                    <div className="match-info-date-row">
                        <span className='match-info-date'>
                            <svg
                                fill="none"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                >
                                <rect
                                    x="3"
                                    y="4"
                                    rx="2"
                                    ry="2"
                                    width="18"
                                    height="18"
                                ></rect>
                                <line x1="16" x2="16" y1="2" y2="6"></line>
                                <line x1="8" x2="8" y1="2" y2="6"></line>
                                <line x1="3" x2="21" y1="10" y2="10"></line>
                            </svg>
                        </span>
                        <span><text>Oct 24, 2026</text></span>
                    </div>
                    <div><text>Mexico City Stadium</text></div>
                    <div><text>Mexico City</text></div>
                </div>
                <div className="match-scoreline-wrapper">
                    <div className='match-round'>
                        Round 1 <span className="match-round-dot">·</span> Group A
                    </div>
                    <div className="match-scoreline">
                        <span className="team-home"><text>Liverpool</text></span>
                        <div className="score-result" onClick={() => navigate('/fixtures')}>
                            <button className="score-button">1</button>
                            <span className="score-separator"><text>:</text></span>
                            <button className="score-button">2</button>
                        </div>
                        <span className="team-away"><text>Manchester United</text></span>
                    </div>                 
                </div>
                <div className="match-actions">
                    <div className="match-friends-scores">
                        <div className="friend-scores">
                            <div className="friend-score-item">
                                <span className="friend-name">Alex</span>
                                <span className="friend-points">+10 pts</span>
                            </div>
                            <div className="friend-score-item">
                                <span className="friend-name">Jordan</span>
                                <span className="friend-points">+3 pts</span>
                            </div>  
                            <div className="your-score-item">
                                <span className="friend-name">You</span>
                                <span className="friend-points">+3 pts</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchFixture;