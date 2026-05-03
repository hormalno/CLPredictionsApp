import GoalItem from '../goal-item/GoalItem';
import type { MatchDetail } from '../../../../types';
import './GoalScorers.css';

type Props = {
  match: MatchDetail;
}

const GoalScorers = ({match} : Props) => {
    const homeGoals = match.goals.filter(g => g.team_scored === match.home_team.name);
    const awayGoals = match.goals.filter(g => g.team_scored === match.away_team.name);

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
                  <span className="goal-scorers__total">
                    <text>{match.score_home_team} Goals</text>
                  </span>
                </div>
                <ul className="goal-scorers__list">
                  {homeGoals.length > 0 && homeGoals.map(goal => (
                    <GoalItem key={goal.id} goal={goal} />
                  ))}
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
                  {awayGoals.length > 0 && awayGoals.map(goal => (
                    <GoalItem key={goal.id} goal={goal} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
    );
};

export default GoalScorers;