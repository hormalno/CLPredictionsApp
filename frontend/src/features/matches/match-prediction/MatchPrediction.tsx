import { useState } from 'react';
import { CalendarIcon, SaveIcon } from '../../../components/icons/Icons';
import type { Match, MatchPrediction as MatchPredictionType } from '../../../types';
import { formatMatchDate } from '../../../utils/formatMatchDate';
import { submitPrediction } from '../../../api';
import './MatchPrediction.css';
import HomeTeam from '../../teams/home-team/HomeTeam';
import AwayTeam from '../../teams/away-team/AwayTeam';
import { Button } from '../../../components/button/Button';

type Props = { 
    match: Match; 
    prediction: MatchPredictionType | undefined;
    onSaved?: () => void 
};

const MatchPrediction = ({ match, prediction, onSaved }: Props) => {
    const [homeScore, setHomeScore] = useState<string>(prediction ? String(prediction.home_team_score) : '');
    const [awayScore, setAwayScore] = useState<string>(prediction ? String(prediction.away_team_score) : '');
    const [hasPrediction, setHasPrediction] = useState(!!prediction);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

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
                    <div>{match.stadium}</div>
                    <div>{match.location}</div>
                </div>
                <div className="match-prediction-scoreline-wrapper">
                    <div className='match-prediction-round'>
                        {match.round !== 'GS' ? match.round_display : `Group ${match.group_display}`}
                    </div>
                    <div className="match-prediction-scoreline">
                        <HomeTeam team={match.home_team} />
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
                        <AwayTeam team={match.away_team} />
                    </div>
                </div>
                <div className='match-prediction-actions'>
                    <div className="match-prediction-save">
                        <div className="save-button">
                            <Button variant='outline' size='sm' onClick={handleSave} disabled={saved || loading}>
                                <SaveIcon size={16} />{loading ? 'Saving...' : saved ? 'Saved!' : hasPrediction ? 'Edit Prediction' : 'Save Prediction'}
                            </Button>
                        </div>
                        {error && <p className="prediction-error">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchPrediction;