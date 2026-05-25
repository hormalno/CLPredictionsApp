import { Link } from 'react-router-dom';
import type { Match, MatchUserScore } from '../../../types';
import './MatchResultCard.css';

type Props = {
    match: Match;
    userScores: MatchUserScore[] | undefined;
};

const MatchResultCard = ({match, userScores} : Props) => {
    return (
        <Link className="result-card" to={`/match/${match.id}`}>
            <div className="result-header">
                <span>{match.group ? `Group ${match.group_display}` : `Round ${match.round_display}`}</span>
            </div>
            <div className="result-score">
                <span>{match.home_team?.short_name}</span>
                <span className="score-number">{match.score_home_team} - {match.score_away_team}</span>
                <span>{match.away_team?.short_name}</span>
            </div>
            <div className="friend-scores">
                {userScores && userScores.map(score => (
                    <div className="friend-score-item">
                        <span className="friend-name">{score.username}</span>
                        <span className="friend-points">+{score.points} pts</span>
                    </div>)
                )}
            </div>
        </Link>
    );
};

export default MatchResultCard;
