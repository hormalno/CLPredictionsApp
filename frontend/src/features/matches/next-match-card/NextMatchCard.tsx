import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/button/Button';
import { CalendarIcon } from '../../../components/icons/Icons';
import { formatMatchDate } from '../../../utils/formatMatchDate';
import type { Match } from '../../../types';
import './NextMatchCard.css';
import { mockTeams } from '../../../mocks';
import TeamNextMatch from '../../teams/team-next-match/TeamNextMatch';

type Props = {
    match: Match;
};

const NextMatchCard = ({match} : Props) => {
    const navigate = useNavigate();
    const homeTeam = mockTeams.find(t => t.id === match.homeTeam);
    const awayTeam = mockTeams.find(t => t.id === match.awayTeam);

    if (!homeTeam || !awayTeam) return null;

    return (
        <div className="next-match-card">
            <span className="next-match-label">Next Upcoming Match</span>
            <div className="next-match-teams">
                <TeamNextMatch team={homeTeam} />
                <div className="match-vs">
                    <span>VS</span>
                </div>
                <TeamNextMatch team={awayTeam} />
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