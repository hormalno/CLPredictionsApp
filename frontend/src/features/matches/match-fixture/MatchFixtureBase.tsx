import { useNavigate } from 'react-router-dom';
import { CalendarIcon } from '../../../components/icons/Icons';
import { formatMatchDate } from '../../../utils/formatMatchDate';
import HomeTeam from '../../teams/home-team/HomeTeam';
import AwayTeam from '../../teams/away-team/AwayTeam';
import type { Match } from '../../../types';
import './MatchFixtureBase.css';

type Props = {
    match: Match;
    children?: React.ReactNode;
};

const MatchFixture = ({ match, children }: Props) => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="match-item">
                <div className="match-info">
                    <div className="match-info-date-row">
                        <span className='match-info-date'>
                            <CalendarIcon size={16} />
                        </span>
                        <span>{formatMatchDate(match.date)}</span>
                    </div>
                    <div>{match.stadium}</div>
                    <div>{match.location}</div>
                </div>
                <div className="match-scoreline-wrapper">
                    <div className='match-round'>
                        {match.round} {match.group && <><span className="match-round-dot">·</span> GROUP {match.group}</>}
                    </div>
                    <div className="match-scoreline">
                        <HomeTeam team={match.home_team} />
                        <div className="score-result" onClick={() => navigate(`/match/${match.id}`)}>
                            <span className="score-box">{match.score_home_team}</span>
                            <span className="score-separator">-</span>
                            <span className="score-box">{match.score_away_team}</span>
                        </div>
                        <AwayTeam team={match.away_team} />
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
