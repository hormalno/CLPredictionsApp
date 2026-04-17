import './MatchPrediction.css';

const MatchPrediction = () => {
    return (        
        <div>
            <div className="match-prediction-item">
                <div className="match-prediction-info">
                    <div className="match-prediction-info-date-row">
                        <span className='match-prediction-info-date'>
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
                <div className="match-prediction-scoreline-wrapper">
                    <div className='match-prediction-round'>
                        Round 1 <span className="match-prediction-round-dot">·</span> Group A
                    </div>
                    <div className="match-prediction-scoreline">
                        <span className="match-prediction-team-home"><text>Liverpool</text></span>
                        <div className="prediction-inputs">
                            <input
                            type="number"
                            max="99"
                            min="0"
                            placeholder="-"
                            data-prediction="home"
                            className="input score-input"
                            />
                            <span className="match-prediction-score-separator"><text>:</text></span>
                            <input
                            type="number"
                            max="99"
                            min="0"
                            placeholder="-"
                            data-prediction="away"
                            className="input score-input"
                            />
                        </div>
                        <span className="match-prediction-team-away"><text>Everton</text></span>
                    </div>
                    <div className='prediction-outcome'>
                        <text>Your prediction: Liverpool Win</text>
                    </div>
                </div>
                <div className="match-prediction-actions">
                    asd
                </div>
            </div>
        </div>
    );
};

export default MatchPrediction;