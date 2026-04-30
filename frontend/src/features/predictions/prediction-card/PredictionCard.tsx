import { UserIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from "../../../components/icons/Icons";
import type { MatchUserPrediction } from "../../../types";
import './PredictionCard.css';

type Props = {
    prediction: MatchUserPrediction;
}

const PredictionCard = ({prediction} : Props) => {
    const classOutcome = prediction.is_finished ? prediction.correct_outcome ? 'correct' : 'wrong' : 'pending';
    const predictionResult = prediction.is_finished ? prediction.correct_outcome ? 'Correct Score' : 'Wrong Result' : 'Pending';
    const showIcon = () => {
        if (!prediction.is_finished) {
            return <ClockIcon size={24} color="#b3b606" />;
        }

        if (prediction.correct_outcome) {
            return <CheckCircleIcon size={24} color="#2ecc71" />;
        }

        return <XCircleIcon size={24} color="#e74c3c" />;
    }

    return (
        <article className={`user-prediction-card ${classOutcome}`}>
            <div className="user-info">
                <div className="avatar">
                    <UserIcon size={24} />
                </div>
                <div className="meta">
                <h3 className="username">
                    <text>{prediction.username}</text>
                </h3>
                <span className="status-label">
                    <text>{predictionResult}</text>
                </span>
                </div>
                <div className="badge">
                    {showIcon()}
                </div>
            </div>
            <div className="score-box">
                <span className="predicted-score">
                <text>{prediction.home_team_score} - {prediction.away_team_score}</text>
                </span>
            </div>
        </article>
    );
};

export default PredictionCard;