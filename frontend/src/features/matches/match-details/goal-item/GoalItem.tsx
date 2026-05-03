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
            <span className="goal-scorers__name">
                <text>{goal.goalscorer.name}</text>
            </span>
            <span className="goal-scorers__time">
                <text>{goal.minute}' {goal.is_penalty && '(P)'} {goal.is_own_goal && '(OG)'}</text>
            </span>
            </div>
        </li>
    );
};

export default GoalItem;