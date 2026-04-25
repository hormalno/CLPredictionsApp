import { useNavigate } from 'react-router-dom';
import type { Match } from '../../../types';
import { formatMatchDate } from '../../../utils/formatMatchDate';
import { Button } from '../../../components/button/Button';
import './UpcomingMatchCard.css';
import { mockTeams } from '../../../mocks';

type Props = {
    match: Match;
};

const UpcomingMatchCard = ({match} : Props) => {
    const navigate = useNavigate();
    const homeTeam = mockTeams.find(t => t.id === match.homeTeam);
    const awayTeam = mockTeams.find(t => t.id === match.awayTeam);
    
    if (!homeTeam || !awayTeam) return null;

    return (
        <div className="upcoming-match-card">
            <div className="match-time">
                <span>{formatMatchDate(match.date)}</span>
            </div>
            <div className="match-teams-row">
                <div className="match-team">
                <span>{homeTeam.shortName}</span>
                </div>
                <div className="match-vs-small">
                <span>vs</span>
                </div>
                <div className="match-team">
                <span>{awayTeam.shortName}</span>
                </div>
            </div>
            <Button variant="primary" size="sm"  onClick={() => navigate(`/match/${match.id}`)}>
                View Match
            </Button>
        </div>
    )
};

export default UpcomingMatchCard;