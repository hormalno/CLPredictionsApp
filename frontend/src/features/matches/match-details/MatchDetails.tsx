import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, SoccerBallIcon, UserIcon, CheckCircleIcon, XCircleIcon } from '../../../components/icons/Icons';
import type { Match } from '../../../types';
import "./MatchDetails.css";

type Props = {
    match: Match;
};

const MatchDetails = ({match} : Props) => {
    const navigate = useNavigate();

    return (
        <>
        <header className="header-match-result">
          <div className="header-match-result__container">
            <div className="header-match-result__top-actions">
              <button
                aria-label="Go back to previous page"
                className="header-match-result__back-btn btn-primary btn"
                onClick={() => navigate(-1)}
              >
                <ArrowLeftIcon size={24} />
                <span>Back</span>
              </button>
            </div>
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
                MatchMates Friends League • {match.date}
              </p>
            </div>
          </div>
        </header>
        <section className="goal-scorers">
          <div className="goal-scorers__container">
            <h2 className="section-title"><text>Goal Scorers</text></h2>
            <div className="goal-scorers__grid">
              <div className="goal-scorers__column">
                <div className="goal-scorers__team-header">
                  <span className="goal-scorers__team-name">
                    <text>Team A</text>
                  </span>
                  <span className="goal-scorers__total"><text>3 Goals</text></span>
                </div>
                <ul className="goal-scorers__list">
                  <li className="goal-scorers__item">
                    <div className="goal-scorers__icon-box">
                      <SoccerBallIcon size={24} />
                    </div>
                    <div className="goal-scorers__info">
                      <span className="goal-scorers__name">
                        <text>Marcus Rashford</text>
                      </span>
                      <span className="goal-scorers__time">
                        <text>12', 45+2'</text>
                      </span>
                    </div>
                  </li>
                  <li className="goal-scorers__item">
                    <div className="goal-scorers__icon-box">
                      <SoccerBallIcon size={24} />
                    </div>
                    <div className="goal-scorers__info">
                      <span className="goal-scorers__name">
                        <text>Bruno Fernandes</text>
                      </span>
                      <span className="goal-scorers__time">
                        <text>78' (P)</text>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="goal-scorers__column">
                <div className="goal-scorers__team-header">
                  <span className="goal-scorers__team-name">
                    <text>Team B</text>
                  </span>
                  <span className="goal-scorers__total"><text>1 Goal</text></span>
                </div>
                <ul className="goal-scorers__list">
                  <li className="goal-scorers__item">
                    <div className="goal-scorers__icon-box">
                      <SoccerBallIcon size={24} />
                    </div>
                    <div className="goal-scorers__info">
                      <span className="goal-scorers__name">
                        <text>Erling Haaland</text>
                      </span>
                      <span className="goal-scorers__time"><text>34'</text></span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="user-predictions">
          <div className="user-predictions__container">
            <div className="user-predictions__header">
              <h2 className="section-title"><text>Friend Predictions</text></h2>
              <p className="section-content">
                <text>See who called it right in the MatchMates group.</text>
              </p>
            </div>
            <div className="user-predictions__grid">
              <article
                className="user-predictions__card user-predictions__card--correct"
              >
                <div className="user-predictions__user-info">
                  <div className="user-predictions__avatar">
                    <UserIcon size={24} />
                  </div>
                  <div className="user-predictions__meta">
                    <h3 className="user-predictions__username">
                      <text>Alex Smith</text>
                    </h3>
                    <span className="user-predictions__status-label">
                      <text>Correct Score</text>
                    </span>
                  </div>
                  <div className="user-predictions__badge">
                    <CheckCircleIcon size={24} color="#2ecc71" />
                  </div>
                </div>
                <div className="user-predictions__score-box">
                  <span className="user-predictions__predicted-score">
                    <text>3 - 1</text>
                  </span>
                </div>
              </article>
              <article
                className="user-predictions__card--incorrect user-predictions__card"
              >
                <div className="user-predictions__user-info">
                  <div className="user-predictions__avatar">
                    <UserIcon size={24} />
                  </div>
                  <div className="user-predictions__meta">
                    <h3 className="user-predictions__username">
                      <text>Jordan Lee</text>
                    </h3>
                    <span className="user-predictions__status-label">
                      <text>Close Call</text>
                    </span>
                  </div>
                  <div className="user-predictions__badge">
                    <XCircleIcon size={24} color="#e74c3c" />
                  </div>
                </div>
                <div className="user-predictions__score-box">
                  <span className="user-predictions__predicted-score">
                    <text>2 - 1</text>
                  </span>
                </div>
              </article>
              <article
                className="user-predictions__card--incorrect user-predictions__card"
              >
                <div className="user-predictions__user-info">
                  <div className="user-predictions__avatar">
                    <UserIcon size={24} />
                  </div>
                  <div className="user-predictions__meta">
                    <h3 className="user-predictions__username">
                      <text>Sarah Chen</text>
                    </h3>
                    <span className="user-predictions__status-label">
                      <text>Wrong Winner</text>
                    </span>
                  </div>
                  <div className="user-predictions__badge">
                    <XCircleIcon size={24} color="#e74c3c" />
                  </div>
                </div>
                <div className="user-predictions__score-box">
                  <span className="user-predictions__predicted-score">
                    <text>1 - 2</text>
                  </span>
                </div>
              </article>
              <article
                className="user-predictions__card user-predictions__card--correct"
              >
                <div className="user-predictions__user-info">
                  <div className="user-predictions__avatar">
                    <UserIcon size={24} />
                  </div>
                  <div className="user-predictions__meta">
                    <h3 className="user-predictions__username">
                      <text>Mike Ross</text>
                    </h3>
                    <span className="user-predictions__status-label">
                      <text>Correct Score</text>
                    </span>
                  </div>
                  <div className="user-predictions__badge">
                    <CheckCircleIcon size={24} color="#2ecc71" />
                  </div>
                </div>
                <div className="user-predictions__score-box">
                  <span className="user-predictions__predicted-score">
                    <text>3 - 1</text>
                  </span>
                </div>
              </article>
            </div>
          </div>
        </section>
        </>
    );
};

export default MatchDetails;
