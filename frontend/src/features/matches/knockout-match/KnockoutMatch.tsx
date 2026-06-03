import { Link } from 'react-router-dom';
import KnockoutTeam from '../../teams/knockout-team/KnockoutTeam';
import type { Match } from '../../../types';
import { formatShortDate, formatTime } from '../../../utils/dateConfig';
import './KnockoutMatch.css'

type Props = {
    match: Match;
    children: React.ReactNode;
};

const KnockoutMatch = ({ match, children }: Props) => {
    const dateStr = formatShortDate(match.date);
    const timeStr = formatTime(match.date);

    const homeWinner = match.is_finished &&
        match.score_home_team !== null && match.score_away_team !== null &&
        match.score_home_team > match.score_away_team ? 'winner' : '';
    const awayWinner = match.is_finished &&
        match.score_home_team !== null && match.score_away_team !== null &&
        match.score_away_team > match.score_home_team ? 'winner' : '';

    return (
        <Link to={`/match/${match.id}`}>
            <div className="knockout-match-card">
                <div className="knockout-match-card-header">
                    <span>{dateStr} · {timeStr} · {match.location}</span>
                </div>
                <div className="knockout-match-card-teams">
                    <div className="team-selector-container">
                        <div className="team-row">
                            <div className="team-wrapper">
                                <div className={`team ${homeWinner}`}>
                                    <KnockoutTeam team={match.home_team ?? null} placeholder={match.home_placeholder} />
                                    <span className="knockout-match-card-score">
                                        {match.score_home_team ?? '-'} (0)
                                    </span>
                                </div>
                                <div className={`team ${awayWinner}`}>
                                    <KnockoutTeam team={match.away_team ?? null} placeholder={match.away_placeholder} />
                                    <span className="knockout-match-card-score">
                                        {match.score_away_team ?? '-'} (0)
                                    </span>
                                </div>
                            </div>
                            <div className="knockout-predictions-actions-centered">
                                {match.match_id}
                            </div>
                        </div>            
                        <div className="knockout-predictions-footer-bottom">
                            {/* Actual winner: Brazil */}
                            {/* {error ? (<span className='error'>error</span>) 
                            : prediction?.predicted_winner ? `Predicted winner: ${winnerName}` : 'Predict a winner.'} */}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default KnockoutMatch;
