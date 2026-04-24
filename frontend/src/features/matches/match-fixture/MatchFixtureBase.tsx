import { useNavigate } from 'react-router-dom';
import { CalendarIcon } from '../../../components/icons/Icons';
import type { Match } from '../../../types';
import './MatchFixtureBase.css';

type Props = {
    match: Match;
    children?: React.ReactNode;
};

const MatchFixture = ({ match, children }: Props) => {
    const navigate = useNavigate();
    const date = new Date(match.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <div>
            <div className="match-item">
                <div className="match-info">
                    <div className="match-info-date-row">
                        <span className='match-info-date'>
                            <CalendarIcon size={20} />
                        </span>
                        <span><text>{date}</text></span>
                    </div>
                    <div><text>{match.stadium}</text></div>
                    <div><text>{match.location}</text></div>
                </div>
                <div className="match-scoreline-wrapper">
                    <div className='match-round'>
                        ROUND {match.round} <span className="match-round-dot">·</span> GROUP {match.group}
                    </div>
                    <div className="match-scoreline">
                        <span className="team-home"><text>{match.homeTeam}</text></span>
                        <div className="score-result" onClick={() => navigate('/fixtures')}>
                            <button className="score-button">{match.homeScore}</button>
                            <span className="score-separator"><text>:</text></span>
                            <button className="score-button">{match.awayScore}</button>
                        </div>
                        <span className="team-away"><text>{match.awayTeam}</text></span>
                    </div>
                </div>
                <div className="match-actions">
                    <div className="match-friends-scores">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchFixture;
