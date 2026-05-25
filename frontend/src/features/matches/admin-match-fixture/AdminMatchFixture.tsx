import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, CheckCircleIcon, SaveIcon } from '../../../components/icons/Icons';
import { formatMatchDate } from '../../../utils/formatMatchDate';
import { submitMatch } from '../../../api';
import { Button } from '../../../components/button/Button';
import HomeTeam from '../../teams/home-team/HomeTeam';
import AwayTeam from '../../teams/away-team/AwayTeam';
import AddGoalForm from './AddGoalForm';
import type { MatchDetail } from '../../../types';
import './AdminMatchFixture.css';
import AdminGoal from './AdminGoal';

type Props = {
    match: MatchDetail;
    onSave?: () => void;
};

const AdminMatchFixture = ({ match, onSave }: Props) => {
    const navigate = useNavigate();
    const [homeScore, setHomeScore] = useState<string>('');
    const [awayScore, setAwayScore] = useState<string>('');
    const [isFinished, setIsFinished] = useState(match.is_finished);
    const [savedScores, setSavedScores] = useState({ home: match.score_home_team, away: match.score_away_team });
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<ReactNode>(match.is_finished ? (<p>Match finished!</p>) : (<p className='pending'>Pending result...</p>));

    const handleSubmit = async () => {
        if (isFinished) return;
        if (homeScore === '' || awayScore === '') return;

        setLoading(true);
        setError(null);
        try {
            await submitMatch(match.id, Number(homeScore), Number(awayScore));
            setIsFinished(true);
            setSavedScores({ home: Number(homeScore), away: Number(awayScore) });
            setSaved(true);
            setTimeout(() => setSaved(false), 1500);
            setMessage(<p className='success'>Match result saved successfully.</p>);
            onSave?.();
        } catch {
            setError('Failed to save match result.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-match-input-item">
            <div className="admin-match-input-row">
                <div className="admin-match-input-info">
                    <div className="admin-match-input-info-date-row">
                        <span className='admin-match-input-info-date'>
                            <CalendarIcon size={20} />
                        </span>
                        <span>{formatMatchDate(match.date)}</span>
                    </div>
                    <div>{match.stadium}</div>
                    <div>{match.location}</div>
                </div>
                <div className="admin-match-input-scoreline-wrapper">
                    <div className='admin-match-input-round'>
                        {match.round !== 'GS' ? match.round_display : `Group ${match.group_display}`}
                    </div>
                    <div className="admin-match-input-scoreline">
                        <HomeTeam team={match.home_team} placeholder={match.home_placeholder} />
                        {isFinished ? (
                            <div className="admin-match-score-result" onClick={() => navigate(`/match/${match.id}`)}>
                                <span className="score-box">{savedScores.home}</span>
                                <span className="admin-match-input-score-separator">-</span>
                                <span className="score-box">{savedScores.away}</span>
                            </div>
                        ) : (
                            <div className="admin-match-inputs">
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={2}
                                    placeholder="-"
                                    data-prediction="home"
                                    className="input score-input"
                                    value={homeScore}
                                    onChange={e => setHomeScore(e.target.value.replace(/\D/g, ''))}
                                />
                                <span className="admin-match-input-score-separator">-</span>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={2}
                                    placeholder="-"
                                    data-prediction="away"
                                    className="input score-input"
                                    value={awayScore}
                                    onChange={e => setAwayScore(e.target.value.replace(/\D/g, ''))}
                                />
                            </div>
                        )}
                        <AwayTeam team={match.away_team} placeholder={match.away_placeholder} />
                    </div>
                    <div className='admin-match-bottom'>
                        {error ? <p className="error">{error}</p> : <p>{message}</p>}
                    </div>
                </div>
                <div className='admin-match-input-actions'>
                    <div className="admin-match-input-save">
                        <div className="admin-submit-button">
                            {isFinished ?
                                (<Button variant='outline' size='sm' disabled={true}>
                                    <CheckCircleIcon size={16} />
                                </Button>
                            ) : (<Button variant='outline' size='sm' onClick={handleSubmit} disabled={saved || loading}>
                                    {loading ? 'Saving...' : <SaveIcon size={16} />}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isFinished &&
            <div className='admin-match-add-goals'>
                {((match.score_home_team ?? 0) + (match.score_away_team ?? 0)) > 0 && match.goals.length > 0
                ? (<AdminGoal match={match} />)
                : (<AddGoalForm match={{ ...match, score_home_team: savedScores.home, score_away_team: savedScores.away }} />)}
                
            </div>}
        </div>
    );
};

export default AdminMatchFixture;