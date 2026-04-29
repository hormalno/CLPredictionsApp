import { useNavigate } from 'react-router-dom';
import { CalendarIcon } from '../../../components/icons/Icons';
import { formatMatchDate } from '../../../utils/formatMatchDate';
import HomeTeam from '../../teams/home-team/HomeTeam';
import AwayTeam from '../../teams/away-team/AwayTeam';
import type { Match, MatchPrediction } from '../../../types';
import './MatchFixture.css';

type Props = {
    match: Match;
    prediction: MatchPrediction | undefined;
    children: React.ReactNode;
};

const MatchFixture = ({ match, prediction, children }: Props) => {
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
                        {match.round_display} {match.group && <><span className="match-round-dot">·</span> GROUP {match.group_display}</>}
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
                    <div className='match-scoreline-bottom'>
                        {prediction && `Your prediction: ${prediction.home_team_score} - ${prediction.away_team_score}`}
                    </div>
                </div>
                <div className="match-actions">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MatchFixture;
