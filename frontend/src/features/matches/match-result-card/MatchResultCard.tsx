import { Link } from 'react-router-dom';
import type { Match } from '../../../types';
import { mockTeams } from '../../../mocks';
import './MatchResultCard.css';

type Props = {
    match: Match;
};

const MatchResultCard = ({match} : Props) => {
    const homeTeam = mockTeams.find(t => t.id === match.homeTeam);
    const awayTeam = mockTeams.find(t => t.id === match.awayTeam);
    
    if (!homeTeam || !awayTeam) return null;
    
    return (
        <Link className="result-card" to={`/match/${match.id}`}>
            <div className="result-header">
                <span>{match.group ? `Group ${match.group}` : `Round ${match.round}`}</span>
            </div>
            <div className="result-score">
                <span>{homeTeam.shortName}</span>
                <span className="score-number">{match.homeScore} - {match.awayScore}</span>
                <span>{awayTeam.shortName}</span>
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