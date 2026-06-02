
import { useState } from 'react';
import KnockoutTeam from "../../teams/knockout-team/KnockoutTeam";
import { EditIcon, SaveIcon } from '../../../components/icons/Icons';
import { submitKnockoutPrediction, parseApiError } from '../../../api';
import type { Match, KnockoutPrediction as KnockoutPredictionType } from '../../../types';
import './PredictWinner.css';

type Props = {
    match: Match;
    prediction: KnockoutPredictionType | undefined;
    onSaved?: () => void;
}

const PredictWinner = ({ match, prediction, onSaved }: Props) => {
    const homeTeam = prediction?.predicted_home_team ?? match.home_team;
    const awayTeam = prediction?.predicted_away_team ?? match.away_team;

    const [predictedWinner, setPredictedWinner] = useState<number | null>(prediction?.predicted_winner?.id ?? null);
    const [isEditing, setIsEditing] = useState(!prediction?.predicted_winner);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const winnerName = predictedWinner === homeTeam?.id
        ? homeTeam?.name
        : predictedWinner === awayTeam?.id
            ? awayTeam?.name
            : null;

    const handleSelect = (teamId: number | null) => {
        if (!isEditing || teamId === null) return;
        setPredictedWinner(teamId);
    };

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            await submitKnockoutPrediction({
                match: match.id,
                predicted_home_team: homeTeam?.id ?? null,
                predicted_away_team: awayTeam?.id ?? null,
                predicted_winner: predictedWinner,
            });
            setSaved(true);
            setIsEditing(false);
            onSaved?.();
            setTimeout(() => setSaved(false), 1500);
        } catch (err) {
            setError(parseApiError(err));
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = () => { setIsEditing(true); setError(null); };

    return (
        <div className="team-selector-container predict-winner-root">
            <div className="team-selectors-row">
                <div className="team-selectors-wrapper">
                    <button
                        className={`team-selector knockout-team-winner-btn${predictedWinner === homeTeam?.id ? ' prediction-winner' : ''}`}
                        aria-label={`Select ${homeTeam?.name ?? match.home_placeholder} as winner`}
                        disabled={!isEditing}
                        onClick={() => handleSelect(homeTeam?.id ?? null)}
                    >
                        <KnockoutTeam team={homeTeam} placeholder={match.home_placeholder} />
                    </button>
                    <button
                        className={`team-selector knockout-team-winner-btn${predictedWinner === awayTeam?.id ? ' prediction-winner' : ''}`}
                        aria-label={`Select ${awayTeam?.name ?? match.away_placeholder} as winner`}
                        disabled={!isEditing}
                        onClick={() => handleSelect(awayTeam?.id ?? null)}
                    >
                        <KnockoutTeam team={awayTeam} placeholder={match.away_placeholder} />
                    </button>
                </div>
                <div className="knockout-predictions-actions-centered">
                    {isEditing ? (
                        <button className="btn-save btn btn-outline btn-sm" onClick={handleSave} disabled={saving || saved || predictedWinner === null}>
                            <SaveIcon />Save
                        </button>
                    ) : (
                        <button className="btn-save btn btn-outline btn-sm" onClick={handleEdit}>
                            <EditIcon />Edit
                        </button>
                    )}
                </div>
            </div>
            <div className="knockout-predictions-footer-bottom">
                {error
                    ? <span className="error">{error}</span>
                    : winnerName ? `Predicted winner: ${winnerName}` : 'Predict a winner.'}
            </div>
        </div>
    );
};

export default PredictWinner;
