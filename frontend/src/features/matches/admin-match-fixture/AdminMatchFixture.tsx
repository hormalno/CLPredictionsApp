import { useState, type ReactNode } from 'react';
import { CalendarIcon, CheckCircleIcon, SaveIcon } from '../../../components/icons/Icons';
import { formatMatchDate } from '../../../utils/formatMatchDate';
import { submitMatch } from '../../../api';
import HomeTeam from '../../teams/home-team/HomeTeam';
import AwayTeam from '../../teams/away-team/AwayTeam';
import { Button } from '../../../components/button/Button';
import type { Match } from '../../../types';
import './AdminMatchFixture.css';
import { useNavigate } from 'react-router-dom';

type Props = { 
    match: Match;
};

const AdminMatchFixture = ({ match }: Props) => {
    const navigate = useNavigate();
    const [homeScore, setHomeScore] = useState<string>('');
    const [awayScore, setAwayScore] = useState<string>('');
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<ReactNode>(match.is_finished ? (<p>Match finished!</p>) : (<p className='pending'>Pending result...</p>));


    const handleSubmit = async () => {
        if (match.is_finished) return;
        if (homeScore === '' || awayScore === '') return;

        setLoading(true);
        setError(null);
        try {
            await submitMatch(match.id, Number(homeScore), Number(awayScore));
            setSaved(true);
            setTimeout(() => setSaved(false), 1500);
        } catch {
            setError('Failed to save match result.');
        } finally {
            setLoading(false);
            setMessage((<p className='success'>Match result saved successfully.</p>));
        }
    };

    return (
        <div>
            <div className="admin-match-input-item">
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
                        <HomeTeam team={match.home_team} />
                        {match.is_finished ? (
                            <div className="admin-match-score-result" onClick={() => navigate(`/match/${match.id}`)}>
                                <span className="score-box">{match.score_home_team}</span>
                                <span className="admin-match-input-score-separator">-</span>
                                <span className="score-box">{match.score_away_team}</span>                            
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
                        <AwayTeam team={match.away_team} />
                    </div>
                    <div className='admin-match-bottom'>
                        {error ? <p className="error">{error}</p> : <p>{message}</p>}
                    </div>
                </div>
                <div className='admin-match-input-actions'>
                    <div className="admin-match-input-save">                        
                        <div className="admin-submit-button">
                            {match.is_finished ?
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
        </div>
    );
};

export default AdminMatchFixture;