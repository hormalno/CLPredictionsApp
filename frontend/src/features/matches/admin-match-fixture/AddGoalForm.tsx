import { useState, useEffect } from 'react';
import { createGoal, getPlayersByTeam } from '../../../api';
import type { Match, PlayerSummary } from '../../../types';
import './AddGoalForm.css';

type Props = {
    match: Match;
};

const AddGoalForm = ({ match }: Props) => {
    const [teamId, setTeamId] = useState<number>(match.home_team.id);
    const [players, setPlayers] = useState<PlayerSummary[]>([]);
    const [goalscorer, setGoalscorer] = useState<string>('');
    const [assist, setAssist] = useState<string>('');
    const [minute, setMinute] = useState<string>('');
    const [isPenalty, setIsPenalty] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getPlayersByTeam(teamId).then(setPlayers).catch(() => setPlayers([]));
        setGoalscorer('');
        setAssist('');
    }, [teamId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!goalscorer || !minute) return;
        setLoading(true);
        setError(null);
        try {
            // const updated = await createGoal(match.id, {
            //     goalscorer: Number(goalscorer),
            //     assist_player: assist ? Number(assist) : null,
            //     team_scored: teamId,
            //     minute: Number(minute),
            //     is_penalty: isPenalty,
            // });
            // // onGoalAdded(updated);
            setGoalscorer('');
            setAssist('');
            setMinute('');
            setIsPenalty(false);
        } catch (err) {
            const detail = (err as { response?: { data?: unknown } })?.response?.data;
            setError(typeof detail === 'object' ? JSON.stringify(detail) : 'Failed to add goal.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="add-goal-form" onSubmit={handleSubmit}>
            <h3 className="add-goal-form__title">Add Goal</h3>
            <div className="add-goal-form__row">
                <label className="add-goal-form__label">Team</label>
                <select className="add-goal-form__select" value={teamId} onChange={e => setTeamId(Number(e.target.value))}>
                    <option value={match.home_team.id}>{match.home_team.name}</option>
                    <option value={match.away_team.id}>{match.away_team.name}</option>
                </select>
            </div>
            <div className="add-goal-form__row">
                <label className="add-goal-form__label">Goalscorer</label>
                <select className="add-goal-form__select" value={goalscorer} onChange={e => setGoalscorer(e.target.value)} required>
                    <option value="">— select player —</option>
                    {players.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
            </div>
            <div className="add-goal-form__row">
                <label className="add-goal-form__label">Assist</label>
                <select className="add-goal-form__select" value={assist} onChange={e => setAssist(e.target.value)}>
                    <option value="">— none —</option>
                    {players.filter(p => String(p.id) !== goalscorer).map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
            </div>
            <div className="add-goal-form__row">
                <label className="add-goal-form__label">Minute</label>
                <input
                    className="add-goal-form__input"
                    type="number"
                    min={0}
                    max={125}
                    value={minute}
                    onChange={e => setMinute(e.target.value)}
                    required
                />
            </div>
            <div className="add-goal-form__row add-goal-form__row--checkbox">
                <label className="add-goal-form__label">Penalty</label>
                <input type="checkbox" checked={isPenalty} onChange={e => setIsPenalty(e.target.checked)} />
            </div>
            {error && <p className="add-goal-form__error">{error}</p>}
            <button className="add-goal-form__btn btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Goal'}
            </button>
        </form>
    );
};

export default AddGoalForm;
