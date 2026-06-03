import KnockoutTeam from "../../teams/knockout-team/KnockoutTeam";
import { CheckmarkIcon, ClockIcon, XMarkIcon } from '../../../components/icons/Icons';
import type { KnockoutPrediction, Match } from '../../../types';
import './FinalOutcome.css';

type Props = {
    match : Match;
    prediction : KnockoutPrediction | undefined;
}

const FinalOutcome = ({match, prediction} : Props) => {
    const is_pending = !match.is_finished;
    const outcomeClass = is_pending ? 'pending' : prediction?.winner_correct ? 'correct' : 'wrong';
    const teamSelectorClass = is_pending ? '' : prediction?.home_team_correct ? 'prediction-correct' : 'prediction-incorrect';
    const predictionIndicatorClass = is_pending ? 'pending' : prediction?.away_team_correct ? 'prediction-indicator-correct' : 'prediction-indicator-incorrect';

    return (
        <div className="team-selector-container final-outcome-root">
            <div className="team-selectors-row">
                <div className="team-selectors-wrapper">
                    <div className={`team-selector ${teamSelectorClass}`}>
                        <div className={`prediction-indicator ${predictionIndicatorClass}`}>
                            {match.is_finished ? prediction?.home_team_correct ? <CheckmarkIcon size={14} /> : <XMarkIcon size={14} /> : ''}
                        </div>
                        <KnockoutTeam team={prediction?.predicted_home_team ?? null} placeholder={match.home_placeholder} />
                    </div>
                    <div className={`team-selector ${teamSelectorClass}`}>
                        <div className={`prediction-indicator ${predictionIndicatorClass}`}>
                            {match.is_finished ? prediction?.away_team_correct ? <CheckmarkIcon size={14} /> : <XMarkIcon size={14} /> : ''}
                        </div>
                        <KnockoutTeam team={prediction?.predicted_away_team ?? null} placeholder={match.away_placeholder} />
                    </div>
                </div>
                <div className="knockout-predictions-actions-centered">
                    <div className="match-status">
                        <span className={`${outcomeClass} status-badge`}>
                            {is_pending
                            ? <ClockIcon size={16} />
                            : prediction?.winner_correct
                                ? <CheckmarkIcon size={14} />
                                : <XMarkIcon size={14} />}
                        </span>
                    </div>
                    <div className="points-gained">
                        {match.is_finished && prediction && <text>+{prediction.points} pts</text>}
                    </div>
                </div>
            </div>            
            <div className="knockout-predictions-footer-bottom">
                Winner: Brazil
                {/* {prediction?.predicted_winner ? `Predicted winner: ${winnerName}` : 'Predict a winner.'} */}
            </div>
        </div>
    );
};

export default FinalOutcome;