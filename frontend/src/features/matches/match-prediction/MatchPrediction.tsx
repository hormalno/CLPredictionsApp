import { useState } from 'react';
import { CalendarIcon, SaveIcon } from '../../../components/icons/Icons';
import './MatchPrediction.css';

const MatchPrediction = () => {
    const [homeScore, setHomeScore] = useState<string>('');
    const [awayScore, setAwayScore] = useState<string>('');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        console.log('Prediction saved:', { home: homeScore, away: awayScore });
    };

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
                                value={homeScore}
                                onChange={e => setHomeScore(e.target.value)}
                            />
                            <span className="match-prediction-score-separator"><text>:</text></span>
                            <input
                                type="number"
                                max="99"
                                min="0"
                                placeholder="-"
                                data-prediction="away"
                                className="input score-input"
                                value={awayScore}
                                onChange={e => setAwayScore(e.target.value)}
                            />
                        </div>
                        <span className="match-prediction-team-away"><text>Everton</text></span>
                    </div>
                    <div className='prediction-outcome'>
                        <text>Your prediction: Liverpool Win</text>
                    </div>
                </div>
                <div className="match-prediction-save">
                    <div className="save-button">
                        <button className="btn btn-outline btn-sm" onClick={handleSave} disabled={saved}><SaveIcon size={16} />{saved ? 'Saved Prediction' : 'Save Prediction'}</button>
                    </div>
                </div>             
            </div>
        </div>
    );
};

export default MatchPrediction;