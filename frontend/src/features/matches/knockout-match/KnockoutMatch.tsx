import { Link } from 'react-router-dom';
import KnockoutTeam from '../../teams/knockout-team/KnockoutTeam';
import type { Match } from '../../../types';
import { formatShortDate, formatTime } from '../../../utils/dateConfig';
import './KnockoutMatch.css'

type Props = {
    match: Match;
};

const KnockoutMatch = ({ match }: Props) => {
    const dateStr = formatShortDate(match.date);
    const timeStr = formatTime(match.date);

    const homeWinner = (() => {
        if (!match.is_finished || match.score_home_team === null || match.score_away_team === null) return '';
        if (match.score_home_team > match.score_away_team) return 'winner';
        if (match.score_home_team === match.score_away_team &&
            match.home_penalties !== null && match.away_penalties !== null &&
            match.home_penalties > match.away_penalties) return 'winner';
        return '';
    })();
    const awayWinner = (() => {
        if (!match.is_finished || match.score_home_team === null || match.score_away_team === null) return '';
        if (match.score_away_team > match.score_home_team) return 'winner';
        if (match.score_home_team === match.score_away_team &&
            match.home_penalties !== null && match.away_penalties !== null &&
            match.away_penalties > match.home_penalties) return 'winner';
        return '';
    })();

    return (
        <Link to={`/match/${match.id}`}>
            <div className="knockout-match-card">
                <div className="knockout-match-card-header">
                    <span>{dateStr} · {timeStr} · {match.location}</span>
                    <span className="knockout-match-code">
                        M{match.match_id}
                    </span>
                </div>
                
                <div className="knockout-match-card-teams">
                    <div className="team-selector-container">
                        <div className="team-row">
                            
                            <div className="team-wrapper">
                                <div className={`team ${homeWinner}`}>
                                    <KnockoutTeam team={match.home_team ?? null} placeholder={match.home_placeholder} />
                                    <span className="knockout-match-card-score">
                                        {match.score_home_team ?? '-'} {match.home_penalties ? `(${match.home_penalties})` : ""}
                                    </span>
                                </div>
                                <div className={`team ${awayWinner}`}>
                                    <KnockoutTeam team={match.away_team ?? null} placeholder={match.away_placeholder} />
                                    <span className="knockout-match-card-score">
                                        {match.score_away_team ?? '-'} {match.away_penalties ? `(${match.away_penalties})` : ""}
                                    </span>
                                </div>
                            </div>
                            
                        </div>            
                        <div className="knockout-predictions-footer-bottom">
                            
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default KnockoutMatch;
