import { Link } from 'react-router-dom';
import type { Match } from '../../../types';
import KnockoutTeam from '../../teams/knockout-team/KnockoutTeam';
import './KnockoutMatch.css'

type Props = { match: Match };

const KnockoutMatch = ({ match }: Props) => {
    const dateStr = new Date(match.date).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short',
    });
    const timeStr = new Date(match.date).toLocaleTimeString('en-GB', {
        hour: '2-digit', minute: '2-digit',
    });

    const homeWon = match.is_finished &&
        match.score_home_team !== null && match.score_away_team !== null &&
        match.score_home_team > match.score_away_team;
    const awayWon = match.is_finished &&
        match.score_home_team !== null && match.score_away_team !== null &&
        match.score_away_team > match.score_home_team;

    return (
        <Link to={`/match/${match.id}`}>
            <div className="knockout-match-card">
                <div className="knockout-match-card-header">
                    <span>{dateStr} · {timeStr} · {match.location}</span>
                </div>
                <div className={`knockout-match-card-team${homeWon ? ' winner' : ''}`}>
                    <KnockoutTeam team={match.home_team} placeholder={match.home_placeholder} />
                    <span className="knockout-match-card-score">
                        {match.score_home_team ?? '-'}
                    </span>
                </div>
                <div className={`knockout-match-card-team${awayWon ? ' winner' : ''}`}>
                    <KnockoutTeam team={match.away_team} placeholder={match.away_placeholder} />
                    <span className="knockout-match-card-score">
                        {match.score_away_team ?? '-'}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default KnockoutMatch;
