import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/button/Button';
import { CalendarIcon } from '../../../components/icons/Icons';
import { formatMatchDate } from '../../../utils/formatMatchDate';
import type { Match } from '../../../types';
import './NextMatchCard.css';

type Props = {
    match: Match;
};

const NextMatchCard = ({match} : Props) => {
    const navigate = useNavigate();

    return (
        <div className="next-match-card">
            <span className="next-match-label">Next Upcoming Match</span>
            <div className="next-match-teams">
                <div className="team">
                    <div className="team-logo">
                    <span>FCB</span>
                    </div>
                    <span className="team-name">{match.homeTeam}</span>
                </div>
                <div className="match-vs">
                    <span>VS</span>
                </div>
                <div className="team">
                    <div className="team-logo">
                    <span>RMA</span>
                    </div>
                    <span className="team-name">{match.awayTeam}</span>
                </div>
            </div>
            <div className="next-match-info">
            <div className="match-meta">
                <CalendarIcon size={20} />
                <span>{formatMatchDate(match.date)}</span>
            </div>
            </div>
            <Button variant="secondary" size="xl" onClick={() => navigate(`/match/${match.id}`)}>
                View Match Details
            </Button>
        </div>
    );
};

export default NextMatchCard;