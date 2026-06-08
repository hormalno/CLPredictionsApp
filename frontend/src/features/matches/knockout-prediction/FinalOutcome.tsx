import KnockoutTeam from "../../teams/knockout-team/KnockoutTeam";
import { CheckmarkIcon, ClockIcon, XMarkIcon } from '../../../components/icons/Icons';
import type { KnockoutPrediction, Match } from '../../../types';
import './FinalOutcome.css';

type Props = {
    match : Match;
    prediction : KnockoutPrediction | undefined;
}

const FinalOutcome = ({match, prediction} : Props) => {
    const hasPrediction = prediction != null;
    const isFinished = match.is_finished;

    const outcomeClass = !hasPrediction || !isFinished
        ? 'pending'
        : prediction.winner_correct
            ? 'correct'
            : 'wrong';

    const teamSelectorClass = (correct: boolean | null) =>
        !hasPrediction || !isFinished ? '' : correct ? 'prediction-correct' : 'prediction-incorrect';

    const indicatorClass = (correct: boolean | null) =>
        !hasPrediction || !isFinished ? '' : correct ? 'prediction-indicator-correct' : 'prediction-indicator-incorrect';

    const indicatorIcon = (correct: boolean | null) => {
        if (!hasPrediction || !isFinished) return null;
        return correct ? <CheckmarkIcon size={14} /> : <XMarkIcon size={14} />;
    };

    const actualWinner = (): string | null => {
        if (!isFinished) return null;
        if (match.score_home_team === match.score_away_team) {
            if (match.home_penalties != null && match.away_penalties != null) {
                return match.home_penalties > match.away_penalties
                    ? (match.home_team?.name ?? null)
                    : (match.away_team?.name ?? null);
            }
            return null;
        }
        if (match.score_home_team != null && match.score_away_team != null) {
            return match.score_home_team > match.score_away_team
                ? (match.home_team?.name ?? null)
                : (match.away_team?.name ?? null);
        }
        return null;
    };

    const footerText = () => {
        
        if (isFinished && actualWinner()) {
            return `Winner: ${actualWinner()}`;
        }
        if (hasPrediction && prediction.predicted_winner) {
            return `Predicted winner: ${prediction.predicted_winner.name}`;
        }
        return 'Predict a winner.';
    };

    return (
        <div className="team-selector-container final-outcome-root">
            <div className="team-selectors-row">
                <div className="team-selectors-wrapper">
                    <div className={`team-selector ${teamSelectorClass(prediction?.home_team_correct ?? null)}`}>
                        <div className={`prediction-indicator ${indicatorClass(prediction?.home_team_correct ?? null)}`}>
                            {indicatorIcon(prediction?.home_team_correct ?? null)}
                        </div>
                        <KnockoutTeam team={prediction?.predicted_home_team ?? null} placeholder={match.home_placeholder} />
                    </div>
                    <div className={`team-selector ${teamSelectorClass(prediction?.away_team_correct ?? null)}`}>
                        <div className={`prediction-indicator ${indicatorClass(prediction?.away_team_correct ?? null)}`}>
                            {indicatorIcon(prediction?.away_team_correct ?? null)}
                        </div>
                        <KnockoutTeam team={prediction?.predicted_away_team ?? null} placeholder={match.away_placeholder} />
                    </div>
                </div>
                <div className="knockout-predictions-actions-centered">
                    <div className="match-status">
                        <span className={`${outcomeClass} status-badge`}>
                            {outcomeClass === 'pending'
                                ? <ClockIcon size={16} />
                                : outcomeClass === 'correct'
                                    ? <CheckmarkIcon size={14} />
                                    : <XMarkIcon size={14} />}
                        </span>
                    </div>
                    <div className="points-gained">
                        {isFinished && hasPrediction && <text>+{prediction.points} pts</text>}
                    </div>
                </div>
            </div>
            <div className="knockout-predictions-footer-bottom">
                {footerText()}
            </div>
        </div>
    );
};

export default FinalOutcome;