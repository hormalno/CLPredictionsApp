import { formatMatchDate } from "../../../../utils/formatMatchDate";
import type { Match as MatchType } from "../../../../types";
import './MatchResult.css';

type Props = {
    match : MatchType
}

const MatchResult = ({match} : Props) => {

    return (
        <div className="header-match-result__content">
            <div className="header-match-result__status">
                <span>{match.is_finished ? 'Full Time' : 'Upcoming'}</span>
            </div>
            <div className="header-match-result__score-board">
                <div className="header-match-result__team header-match-result__team--a">
                  <div className="header-match-result__team-icon">
                    {match.home_team.logo
                      ? <img src={match.home_team.logo} alt={match.home_team.short_name} />
                      : <span>{match.home_team.short_name}</span>
                    }
                  </div>
                  <h1 className="hero-title">{match.home_team.name}</h1>
                </div>
                <div className="header-match-result__score-display">
                  <span className="header-match-result__score">{match.score_home_team}</span>
                  <span className="header-match-result__divider">-</span>
                  <span className="header-match-result__score">{match.score_away_team}</span>
                </div>
                <div className="header-match-result__team--b header-match-result__team">
                  <div className="header-match-result__team-icon">
                    {match.away_team.logo
                      ? <img src={match.away_team.logo} alt={match.away_team.short_name} />
                      : <span>{match.away_team.short_name}</span>
                    }
                  </div>
                  <h1 className="hero-title">{match.away_team.name}</h1>
                </div>
            </div>
            <p className="hero-subtitle">
                {match.round === 'GS' ? `Group ${match.group_display}` : match.round_display} • {formatMatchDate(match.date)}
            </p>
        </div>
    );
};

export default MatchResult;