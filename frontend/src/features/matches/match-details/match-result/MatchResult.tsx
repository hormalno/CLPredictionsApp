import { formatMatchDate } from "../../../../utils/formatMatchDate";
import type { Match as MatchType } from "../../../../types";
import './MatchResult.css';
import TeamDetail from "../../../teams/team-detail/TeamDetail";

type Props = {
    match : MatchType
}

const MatchResult = ({match} : Props) => {

    return (
        <div className="header-match-result__content">
            <div className="header-match-result__status">
                <div><button>{match.is_finished ? 'Full Time' : 'Upcoming'}</button></div>
            </div>
            <div className="header-match-result__score-board">
                <TeamDetail team={match.home_team} placeholder={match.home_placeholder} />
                <div className="header-match-result__score-display">
                  <span className="header-match-result__score">{match.score_home_team}</span>
                  <span className="header-match-result__divider">-</span>
                  <span className="header-match-result__score">{match.score_away_team}</span>
                </div>
                <TeamDetail team={match.away_team} placeholder={match.away_placeholder} />
            </div>
            <div className="header-match-result__bottom">                
                <div>{`Match ${match.match_id}`} • {match.round === 'GS' ? `Group ${match.group_display}` : match.round_display} • {formatMatchDate(match.date)}</div>
                <div>{match.stadium } • {match.location}</div>
            </div>
        </div>
    );
};

export default MatchResult;