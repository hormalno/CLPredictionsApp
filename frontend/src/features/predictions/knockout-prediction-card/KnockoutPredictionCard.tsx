import { UserIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from '../../../components/icons/Icons';
import type { KnockoutMatchUserPrediction } from '../../../types';
import '../prediction-card/PredictionCard.css';
import './KnockoutPredictionCard.css';

type Props = {
    prediction: KnockoutMatchUserPrediction;
};

const KnockoutPredictionCard = ({ prediction }: Props) => {
    const allCorrect = prediction.home_team_correct && prediction.away_team_correct;
    const anyCorrect = prediction.home_team_correct || prediction.away_team_correct;
    const cardClass = !prediction.is_finished ? 'pending' : allCorrect ? 'correct' : anyCorrect ? 'partial' : 'wrong';

    const statusLabel = !prediction.is_finished
        ? 'Pending'
        : allCorrect ? 'Both Teams Correct' : anyCorrect ? 'Partial' : 'Wrong';

    const showIcon = () => {
        if (!prediction.is_finished) return <ClockIcon size={24} color="#b3b606" />;
        if (allCorrect) return <CheckCircleIcon size={24} color="#2ecc71" />;
        if (anyCorrect) return <CheckCircleIcon size={24} color="#f39c12" />;
        return <XCircleIcon size={24} color="#e74c3c" />;
    };

    return (
        <article className={`user-prediction-card ${cardClass}`}>
            <div className="user-info">
                <div className="avatar">
                    <UserIcon size={24} />
                </div>
                <div className="meta">
                    <h3 className="username">{prediction.username}</h3>
                    <span className="status-label">{statusLabel}</span>
                </div>
                <div className="badge">{showIcon()}</div>
            </div>
            <div className="knockout-prediction-teams">
                <div className={`knockout-prediction-team ${prediction.home_team_correct ? 'team-correct' : prediction.is_finished ? 'team-wrong' : ''}`}>
                    {prediction.predicted_home_team?.logo && (
                        <img src={prediction.predicted_home_team.logo} alt={prediction.predicted_home_team.name} className="knockout-pred-card-flag" />
                    )}
                    <span>{prediction.predicted_home_team?.name ?? '—'}</span>
                </div>
                <span className="knockout-prediction-vs">vs</span>
                <div className={`knockout-prediction-team ${prediction.away_team_correct ? 'team-correct' : prediction.is_finished ? 'team-wrong' : ''}`}>
                    {prediction.predicted_away_team?.logo && (
                        <img src={prediction.predicted_away_team.logo} alt={prediction.predicted_away_team.name} className="knockout-pred-card-flag" />
                    )}
                    <span>{prediction.predicted_away_team?.name ?? '—'}</span>
                </div>
            </div>
            {prediction.predicted_winner && (
                <div className={`knockout-prediction-winner ${prediction.winner_correct === true ? 'team-correct' : prediction.winner_correct === false ? 'team-wrong' : ''}`}>
                    <span className="knockout-prediction-winner-label">Winner</span>
                    {prediction.predicted_winner.logo && (
                        <img src={prediction.predicted_winner.logo} alt={prediction.predicted_winner.name} className="knockout-pred-card-flag" />
                    )}
                    <span>{prediction.predicted_winner.name}</span>
                </div>
            )}
        </article>
    );
};

export default KnockoutPredictionCard;
