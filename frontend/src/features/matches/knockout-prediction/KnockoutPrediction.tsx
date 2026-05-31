import { useState } from 'react';
import KnockoutTeam from '../../teams/knockout-team/KnockoutTeam';
import type { KnockoutPrediction as KnockoutPredictionType, Match, Team } from '../../../types';
import { submitKnockoutPrediction } from '../../../api';
import './KnockoutPrediction.css';
import { EditIcon, SaveIcon } from '../../../components/icons/Icons';

type Props = {
    match: Match;
    prediction: KnockoutPredictionType | undefined;
    homeTeams: Team[];
    awayTeams: Team[];
    usedTeamIds?: Set<number>;
    canSelectTeams?: boolean;
    onSaved?: () => void;
};

const KnockoutPrediction = ({ match, prediction, homeTeams, awayTeams, usedTeamIds, canSelectTeams = false, onSaved }: Props) => {
    const predicted_home_team = prediction?.predicted_home_team ?? null;
    const predicted_away_team = prediction?.predicted_away_team ?? null;
    const predicted_winner = prediction?.predicted_winner ?? null;

    const hasBothTeams = !!(predicted_home_team && predicted_away_team);

    // R32: start in edit mode if no prediction yet; other rounds: never in team-select edit mode
    const [isEditing, setIsEditing] = useState(canSelectTeams && !hasBothTeams);
    const [homeTeamId, setHomeTeamId] = useState<number | ''>(predicted_home_team?.id ?? '');
    const [awayTeamId, setAwayTeamId] = useState<number | ''>(predicted_away_team?.id ?? '');
    const [winnerId, setWinnerId] = useState<number | null>(predicted_winner?.id ?? null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const dateStr = new Date(match.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    const timeStr = new Date(match.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const canSelectWinner = canSelectTeams
        ? (!!homeTeamId && !!awayTeamId)
        : hasBothTeams;

    const allSelectableTeams = [...homeTeams, ...awayTeams];
    const resolvedWinner = allSelectableTeams.find(t => t.id === winnerId) ?? predicted_winner ?? null;

    const winnerLabel = resolvedWinner?.name ?? (winnerId ? 'Unknown' : 'No winner selected');

    const handleEdit = () => { setIsEditing(true); setError(null); };


    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            await submitKnockoutPrediction({
                match: match.id,
                ...(canSelectTeams && {
                    predicted_home_team: homeTeamId || null,
                    predicted_away_team: awayTeamId || null,
                }),
                predicted_winner: winnerId,
            });
            setSaved(true);
            if (canSelectTeams) setIsEditing(false);
            onSaved?.();
            setTimeout(() => setSaved(false), 1500);
        } catch {
            setError('Failed to save.');
        } finally {
            setSaving(false);
        }
    };

    const renderDisplayTeamRow = (team: Team | null, placeholder: string) => {
        const isWinner = team ? winnerId === team.id : false;
        if (!canSelectTeams && team) {
            return (
                <button
                    className={`knockout-team-winner-btn${isWinner ? ' prediction-winner' : ''}`}
                    aria-label={`Select ${team.name} as winner`}
                    onClick={() => setWinnerId(team.id)}
                >
                    <KnockoutTeam team={team} placeholder={placeholder} />
                </button>
            );
        }
        return (
            <div className={`knockout-match-card-team${isWinner ? ' winner' : ''}`}>
                <KnockoutTeam team={team} placeholder={placeholder} />
            </div>
        );
    };

    return (
        <div className="knockout-predictions-match-card">
            <div className="knockout-predictions-thq-saved-result-card-main-elm">
                <div className="match-header">
                    <span>{dateStr} · {timeStr} · {match.location}</span>
                </div>
                <div className="match-teams">
                    <div className="team-selectors-wrapper">
                        {canSelectTeams && isEditing ? (
                            // R32 edit mode: selects for both teams
                            <>
                                <div className="team-selector">
                                    <select
                                        className="custom-select"
                                        value={homeTeamId}
                                        onChange={e => {
                                            const id = Number(e.target.value);
                                            setHomeTeamId(id);
                                            if (winnerId !== null && winnerId !== id && winnerId !== awayTeamId) setWinnerId(null);
                                        }}
                                    >
                                        <option value="" disabled>Select Team</option>
                                        {homeTeams.filter(t => t.id !== awayTeamId && (t.id === homeTeamId || !usedTeamIds?.has(t.id))).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                    </select>
                                    <button
                                        className={`button winner-radio${homeTeamId !== '' && winnerId === homeTeamId ? ' selected' : ''}`}
                                        aria-label="Select as winner"
                                        disabled={!canSelectWinner}
                                        onClick={() => setWinnerId(homeTeamId !== '' ? Number(homeTeamId) : null)}
                                    />
                                </div>
                                <div className="team-selector">
                                    <select
                                        className="custom-select"
                                        value={awayTeamId}
                                        onChange={e => {
                                            const id = Number(e.target.value);
                                            setAwayTeamId(id);
                                            if (winnerId !== null && winnerId !== id && winnerId !== homeTeamId) setWinnerId(null);
                                        }}
                                    >
                                        <option value="" disabled>Select Team</option>
                                        {awayTeams.filter(t => t.id !== homeTeamId && (t.id === awayTeamId || !usedTeamIds?.has(t.id))).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                    </select>
                                    <button
                                        className={`button winner-radio${awayTeamId !== '' && winnerId === awayTeamId ? ' selected' : ''}`}
                                        aria-label="Select as winner"
                                        disabled={!canSelectWinner}
                                        onClick={() => setWinnerId(awayTeamId !== '' ? Number(awayTeamId) : null)}
                                    />
                                </div>
                            </>
                        ) : (
                            // Display mode: team logos/names (+ winner radio for non-R32)
                            <>
                                {renderDisplayTeamRow(predicted_home_team, match.home_placeholder)}
                                {renderDisplayTeamRow(predicted_away_team, match.away_placeholder)}
                            </>
                        )}
                    </div>

                    <div className="knockout-predictions-actions-centered">
                        {canSelectTeams ? (
                            isEditing ? (
                                <button className="btn-save btn btn-outline btn-sm" onClick={handleSave} disabled={saving || saved}>
                                    <SaveIcon />
                                </button>
                            ) : (
                                <button className="btn-save btn btn-outline btn-sm" onClick={handleEdit}>
                                    <EditIcon />
                                </button>
                            )
                        ) : (
                            hasBothTeams && (
                                <button className="btn-save btn btn-outline btn-sm" onClick={handleSave} disabled={saving || saved}>
                                    <SaveIcon />
                                </button>
                            )
                        )}
                    </div>
                </div>
                {error && <p style={{ color: 'red', fontSize: 'var(--font-size-xs)', textAlign: 'center' }}>{error}</p>}
                <div className="winner-selected-label">
                    {canSelectTeams && isEditing && (<span>Predicted winner: {winnerLabel}</span>)}
                </div>
            </div>
            {/* <div className="knockout-predictions-user-scores">
                <div className="user-score-item">
                    <span className="name">User1:</span>
                    <span className="points">+5pts</span>
                </div>
                <div className="user-score-item">
                    <span className="top-earner-name">User2:</span>
                    <span className="top-earner-points">+3pts</span>
                </div>
                <div className="user-score-item">
                    <span className="top-earner-name">User3:</span>
                    <span className="top-earner-points">+1pts</span>
                </div>
            </div> */}
        </div>
    );
};

export default KnockoutPrediction;
