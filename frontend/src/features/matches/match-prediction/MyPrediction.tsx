import { CircleCheckIcon, ClockIcon, XSquareIcon } from '../../../components/icons/Icons';
import type { MatchPrediction } from '../../../types';
import './MyPrediction.css'

type Props = {
    is_pending: boolean;
    prediction: MatchPrediction;
};

const MyPrediction = ({is_pending, prediction }: Props) => {
    const outcomeClass = is_pending ? 'pending' : prediction.correct_outcome ? 'correct' : 'wrong';
    
    const getScoreStatus = () => {
        if (is_pending) {
            return (<span className="pending status-badge">
                        <ClockIcon size={16} />
                        <span><text>Pending score</text></span>
                    </span>)
        }

        if (!prediction.correct_away_team_score && !prediction.correct_away_team_score) {
            return (<span className="wrong status-badge">
                        <XSquareIcon size={16} />
                        <span><text>Total miss</text></span>
                    </span>)
        }

        if (prediction.correct_home_team_score && prediction.correct_away_team_score) {
            return (<span className="correct status-badge">
                        <CircleCheckIcon size={16} />
                        <span><text>Perfect score</text></span>
                    </span>)
        }

        return (<span className="partial status-badge">
                        <CircleCheckIcon size={16} />
                        <span><text>One team correct</text></span>
                    </span>)
    }

    return (
        <div className='your-outcome-result'>
            <div className="match-status">
                <span className={`${outcomeClass} status-badge`}>
                    {is_pending
                    ? <ClockIcon size={16} />
                    : prediction?.correct_outcome
                        ? <CircleCheckIcon size={16} />
                        : <XSquareIcon size={16} />}
                    <span><text>{is_pending ? 'Pending' : prediction.correct_outcome ? 'Correct outcome' : 'Wrong outcome'}</text></span>
                </span>
            </div>
            <div className="match-status">
                {getScoreStatus()}
            </div>
            <div className="points-gained">
                <text>Points gained: +{prediction.points} pts</text>
            </div>
        </div>
    );
};

export default MyPrediction;
