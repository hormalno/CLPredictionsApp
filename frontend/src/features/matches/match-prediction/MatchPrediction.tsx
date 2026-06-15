import { useState, useEffect } from 'react';
import { formatMatchDate } from '../../../utils/formatMatchDate';
import { submitPrediction } from '../../../api';
import { CalendarIcon, SaveIcon } from '../../../components/icons/Icons';
import { Button } from '../../../components/button/Button';
import HomeTeam from '../../teams/home-team/HomeTeam';
import AwayTeam from '../../teams/away-team/AwayTeam';
import type { Match, MatchPrediction as MatchPredictionType } from '../../../types';
import './MatchPrediction.css';
import MyPrediction from './MyPrediction';

type Props = { 
    match: Match; 
    prediction: MatchPredictionType | undefined;
    onSaved?: () => void;
};

const MatchPrediction = ({ match, prediction, onSaved }: Props) => {
    const [homeScore, setHomeScore] = useState<string>(prediction ? String(prediction.home_team_score) : '');
    const [awayScore, setAwayScore] = useState<string>(prediction ? String(prediction.away_team_score) : '');
    const [hasPrediction, setHasPrediction] = useState(!!prediction);

    useEffect(() => {
        if (prediction) {
            setHomeScore(String(prediction.home_team_score));
            setAwayScore(String(prediction.away_team_score));
            setHasPrediction(true);
        }
    }, [prediction]);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const scoreResultClass = () => {
        if (match.is_finished) {
            return prediction?.correct_outcome ? 'success' : 'wrong'
        }
        return "";
    };

    const handleSave = async () => {
        if (homeScore === '' || awayScore === '') return;
        setLoading(true);
        setError(null);
        try {
            await submitPrediction(match.id, Number(homeScore), Number(awayScore));
            if (!hasPrediction) onSaved?.();
            setHasPrediction(true);
            setSaved(true);
            setTimeout(() => setSaved(false), 1500);
        } catch {
            setError('Failed to save prediction.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="match-prediction-item">
                <div className="match-prediction-info">
                    <div className="match-prediction-info-date-row">
                        <span className='match-prediction-info-date'>
                            <CalendarIcon size={20} />
                        </span>
                        <span>{formatMatchDate(match.date)}</span>
                    </div>
                    <div className="match-info-venue">
                        <div>{match.stadium}</div>
                        <div>{match.location}</div>
                    </div>
                </div>
                <div className="match-prediction-scoreline-wrapper">
                    <div className='match-prediction-round'>
                        {match.round !== 'GS' ? match.round_display : `Group ${match.group_display}`}
                    </div>
                    <div className="match-prediction-scoreline">
                        <HomeTeam team={match.home_team} placeholder={match.home_placeholder} />
                        {match.is_closed ? (
                            <div className={`match-prediction-score-result ${scoreResultClass()}`}>
                                <span className="match-prediction-score-box">{prediction ? prediction.home_team_score : '-'}</span>
                                <span className="match-prediction-score-separator">-</span>
                                <span className="match-prediction-score-box">{prediction ? prediction.away_team_score : '-'}</span>
                            </div>
                        ) : (
                            <div className="prediction-inputs">
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={2}
                                    placeholder="-"
                                    data-prediction="home"
                                    className="input score-input"
                                    value={homeScore}
                                    onChange={e => setHomeScore(e.target.value)}
                                />
                                <span className="match-prediction-score-separator">:</span>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={2}
                                    placeholder="-"
                                    data-prediction="away"
                                    className="input score-input"
                                    value={awayScore}
                                    onChange={e => setAwayScore(e.target.value)}
                                />
                            </div>
                        )}
                        <AwayTeam team={match.away_team} placeholder={match.away_placeholder} />
                    </div>
                    <div className='match-prediction-bottom'>
                        {match.is_finished ? `Actual result: ${match.score_home_team} - ${match.score_away_team}` : 'Pending...'}
                        {error && <p className="error">{error}</p>}
                    </div>
                </div>
                <div className='match-prediction-actions'>
                    {match.is_closed ?
                        prediction && <MyPrediction is_pending={!match.is_finished} prediction={prediction} />
                    : (
                        <div className="match-prediction-save">
                            <div className="save-button">
                                <Button variant='outline' size='sm' onClick={handleSave} disabled={saved || loading}>
                                    <SaveIcon size={16} />{loading ? 'Saving...' : saved ? 'Saved!' : hasPrediction ? 'Edit Prediction' : 'Save Prediction'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MatchPrediction;