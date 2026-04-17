import './MatchPrediction.css';

const MatchPrediction = () => {
    return (        
        <div>
            <div className="match-item">
                <div className="match-info">
                <span><text>Matchday 15 • Feb 24</text></span>
                </div>
                <div className="match-scoreline">
                <span className="team-home"><text>The Predictors</text></span>
                <div className="prediction-inputs">
                    <input
                    type="number"
                    max="99"
                    min="0"
                    placeholder="-"
                    data-prediction="home"
                    className="input score-input"
                    />
                    <span className="score-separator"><text>:</text></span>
                    <input
                    type="number"
                    max="99"
                    min="0"
                    placeholder="-"
                    data-prediction="away"
                    className="input score-input"
                    />
                </div>
                <span className="team-away"><text>Goal Seekers</text></span>
                </div>
                <div className="outcome-buttons">
                <button
                    type="button"
                    data-outcome="home"
                    className="outcome-btn button"
                >
                    <text>Home Win</text>
                </button>
                <button
                    type="button"
                    data-outcome="draw"
                    className="outcome-btn button"
                >
                    <text>Draw</text>
                </button>
                <button
                    type="button"
                    data-outcome="away"
                    className="outcome-btn button"
                >
                    <text>Away Win</text>
                </button>
                </div>
                <a href="#">
                <div className="see-predictions-btn">
                    <span>See Predictions</span>
                </div>
                </a>
            </div>
        </div>
    );
};

export default MatchPrediction;