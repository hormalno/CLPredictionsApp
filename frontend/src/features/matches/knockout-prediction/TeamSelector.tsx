import { useState } from 'react';
import { submitKnockoutPrediction, parseApiError } from '../../../api';
import { EditIcon, SaveIcon } from '../../../components/icons/Icons';
import type { KnockoutPrediction as KnockoutPredictionType, Match, Team } from '../../../types';
import './TeamSelector.css';

type Props = {
    match: Match;
    prediction: KnockoutPredictionType | undefined;
    homeTeams: Team[];
    awayTeams: Team[];
    usedTeamIds?: Set<number>;
    onSaved?: () => void;
};

const TeamSelector = ({ match, prediction, homeTeams, awayTeams, usedTeamIds, onSaved }: Props) => {
    const savedHomeId = prediction?.predicted_home_team?.id;
    const savedAwayId = prediction?.predicted_away_team?.id;
    const allTeams = [...homeTeams, ...awayTeams];
    const [predictedHomeTeam, setPredictedHomeTeam] = useState<number | ''>(prediction?.predicted_home_team?.id ?? '');
    const [predictedAwayTeam, setPredictedAwayTeam] = useState<number | ''>(prediction?.predicted_away_team?.id ?? '');
    const [predictedWinner, setPredictedWinner] = useState<number | null>(prediction?.predicted_winner?.id ?? null);
    const winnerName = allTeams.find(t => t.id === predictedWinner)?.name;
    const hasBothTeams = !!(predictedHomeTeam && predictedAwayTeam);
    const [isEditing, setIsEditing] = useState(!hasBothTeams);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);
    


    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            await submitKnockoutPrediction({
                match: match.id,
                ...({
                    predicted_home_team: predictedHomeTeam || null,
                    predicted_away_team: predictedAwayTeam || null,
                }),
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
        <div className="team-selector-container team-selector-root">
            <div className="team-selectors-row">
                <div className="team-selectors-wrapper">
                    <div className="team-selector">
                        <select
                            className="custom-select"
                            value={predictedHomeTeam ?? ''}
                            disabled={!isEditing}
                            onChange={e => {
                                const id = Number(e.target.value);
                                setPredictedHomeTeam(id);
                                if (predictedWinner !== null && predictedWinner !== id && predictedWinner !== predictedAwayTeam) setPredictedWinner(null);
                            }}
                        >
                            <option value="" disabled>-- Team {match.home_placeholder} --</option>
                            {homeTeams.filter(t => t.id !== predictedAwayTeam && (t.id === savedHomeId || t.id === savedAwayId || !usedTeamIds?.has(t.id))).map(t => <option key={t.id} value={t.id}>{t.name} ({t.group_name})</option>)}
                        </select>
                        <button
                            className={`button winner-radio${predictedHomeTeam !== '' && predictedWinner === predictedHomeTeam ? ' selected' : ''}`}
                            aria-label="Select as winner"
                            disabled={!isEditing || !hasBothTeams}
                            onClick={() => setPredictedWinner(predictedHomeTeam !== '' ? Number(predictedHomeTeam) : null)}
                        />
                    </div>
                    <div className="team-selector">
                        <select
                            className="custom-select"
                            value={predictedAwayTeam ?? ''}
                            disabled={!isEditing}
                            onChange={e => {
                                const id = Number(e.target.value);
                                setPredictedAwayTeam(id);
                                if (predictedWinner !== null && predictedWinner !== id && predictedWinner !== predictedHomeTeam) setPredictedWinner(null);
                            }}
                        >
                            <option value="" disabled>-- Team {match.away_placeholder} --</option>
                            {awayTeams.filter(t => t.id !== predictedHomeTeam && (t.id === savedHomeId || t.id === savedAwayId || !usedTeamIds?.has(t.id))).map(t => <option key={t.id} value={t.id}>{t.name} ({t.group_name})</option>)}
                        </select>
                        <button
                            className={`button winner-radio${predictedAwayTeam !== '' && predictedWinner === predictedAwayTeam ? ' selected' : ''}`}
                            aria-label="Select as winner"
                            disabled={!isEditing || !hasBothTeams}
                            onClick={() => setPredictedWinner(predictedAwayTeam !== '' ? Number(predictedAwayTeam) : null)}
                        />
                    </div>
                </div>
                <div className="knockout-predictions-actions-centered">
                    {isEditing ? (
                        <button className="btn-save btn btn-outline btn-sm" onClick={handleSave} disabled={saving || saved}>
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

export default TeamSelector;