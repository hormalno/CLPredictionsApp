import { useNavigate } from 'react-router-dom';
import type { Match } from '../../../types';
import { formatMatchDate } from '../../../utils/formatMatchDate';
import './UpcomingMatchCard.css';
import { Button } from '../../../components/button/Button';

type Props = {
    match: Match;
};

const UpcomingMatchCard = ({match} : Props) => {
    const navigate = useNavigate();

    return (
        <div className="upcoming-match-card">
            <div className="match-time">
                <span>{formatMatchDate(match.date)}</span>
            </div>
            <div className="match-teams-row">
                <div className="match-team">
                <span>{match.homeTeamShort}</span>
                </div>
                <div className="match-vs-small">
                <span>vs</span>
                </div>
                <div className="match-team">
                <span>{match.awayTeamShort}</span>
                </div>
            </div>
            <Button variant="primary" size="sm"  onClick={() => navigate(`/match/${match.id}`)}>
                View Match
            </Button>
        </div>
    )
};

export default UpcomingMatchCard;