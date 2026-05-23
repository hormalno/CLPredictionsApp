import { SoccerBallIcon } from "../../../../components/icons/Icons";
import type { Goal } from "../../../../types";
import './GoalItem.css';

type Props = {
    goal : Goal;
}

const GoalItem = ({goal} : Props) => {
    return (
        <li className="goal-scorers__item">
            <div className="goal-scorers__icon-box">
            <SoccerBallIcon size={24} />
            </div>
            <div className="goal-scorers__info">
                <div className="goal-scorers__row">
                    <span className="goal-scorers__name">{goal.goalscorer.name}</span>
                    {goal.is_penalty && (<span className="goal-penalty"> (P)</span>)}
                    {goal.is_own_goal && (<span className="goal-own"> (OG)</span>)}
                    {goal.assist_player && (<span className="goal-assist__name"> (Assist: {goal.assist_player.name})</span>)}
                </div>
                <span className="goal-scorers__time">
                    <text>{goal.minute}' </text>
                </span>
            </div>
        </li>
    );
};

export default GoalItem;