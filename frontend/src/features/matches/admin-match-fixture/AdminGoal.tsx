import type { MatchDetail } from '../../../types';
import './AdminGoal.css';

type Props = {
    match: MatchDetail;
};

const AdminGoal = ({ match }: Props) => {
    return (
        <div className="admin-goals">
            {match.goals && match.goals.map(goal =>
            (<div className='admin-goal'>
                <span>{goal.team_scored}: </span>
                <span>{goal.goalscorer.name} {goal.minute}' {goal.is_penalty && '(P)'} {goal.is_own_goal && '(OG)'}</span>
            </div>)
            )}
        </div>
    );
};

export default AdminGoal;
