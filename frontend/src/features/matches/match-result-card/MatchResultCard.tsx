import { Link } from 'react-router-dom';
import type { Match } from '../../../types';
import './MatchResultCard.css';

type Props = {
    match: Match;
};

const MatchResultCard = ({match} : Props) => {
    return (
        <Link className="result-card" to={`/match/${match.id}`}>
            <div className="result-header">
                <span>{match.group ? `Group ${match.group}` : `Round ${match.round}`}</span>
            </div>
            <div className="result-score">
                <span>{match.home_team.short_name}</span>
                <span className="score-number">{match.score_home_team} - {match.score_away_team}</span>
                <span>{match.away_team.short_name}</span>
            </div>
            <div className="friend-scores">
                <div className="friend-score-item">
                    <span className="friend-name">Alex</span>
                    <span className="friend-points">+10 pts</span>
                </div>
                <div className="friend-score-item">
                    <span className="friend-name">Jordan</span>
                    <span className="friend-points">+3 pts</span>
                </div>
            </div>
        </Link>
    );
};

export default MatchResultCard;
