import { SoccerBallIcon } from '../../../../components/icons/Icons';
import type { Match } from '../../../../types';
import './GoalScorers.css';

type Props = {
  match: Match;
}

const GoalScorers = ({match} : Props) => {
    return (
        <section className="goal-scorers">
          <div className="goal-scorers__container">
            <h2 className="section-title"><text>Goal Scorers</text></h2>
            <div className="goal-scorers__grid">
              <div className="goal-scorers__column">
                <div className="goal-scorers__team-header">
                  <span className="goal-scorers__team-name">
                    <text>{match.home_team.name}</text>
                  </span>
                  <span className="goal-scorers__total"><text>{match.score_home_team} Goals</text></span>
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
                    <text>{match.away_team.name}</text>
                  </span>
                  <span className="goal-scorers__total"><text>{match.score_away_team} Goal</text></span>
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
    );
};

export default GoalScorers;