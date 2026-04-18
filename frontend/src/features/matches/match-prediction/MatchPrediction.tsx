import { CalendarIcon } from '../../../components/icons/Icons';
import './MatchPrediction.css';

const MatchPrediction = () => {
    return (        
        <div>
            <div className="match-prediction-item">
                <div className="match-prediction-info">
                    <div className="match-prediction-info-date-row">
                        <span className='match-prediction-info-date'>
                            <CalendarIcon size={20} />
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
                
            </div>
        </div>
    );
};

export default MatchPrediction;