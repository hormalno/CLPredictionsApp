import { useState, useEffect } from 'react';
import { createGoals, getPlayersByTeam } from '../../../api';
import type { MatchDetail, PlayerSummary } from '../../../types';
import './AddGoalForm.css';

type Props = {
    match: MatchDetail;
};

type GoalEntry = {
    teamId: number;
    goalscorer: string;
    assist: string;
    minute: string;
    isPenalty: boolean;
};

const emptyEntry = (defaultTeamId: number): GoalEntry => ({
    teamId: defaultTeamId,
    goalscorer: '',
    assist: '',
    minute: '',
    isPenalty: false,
});

const AddGoalForm = ({ match }: Props) => {
    const [players, setPlayers] = useState<PlayerSummary[]>([]);
    const goal_number = match.score_home_team + match.score_away_team;
    const [entries, setEntries] = useState<GoalEntry[]>(() =>
        Array.from({ length: goal_number }, () => emptyEntry(match.home_team.id))
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        Promise.all([
            getPlayersByTeam(match.home_team.id),
            getPlayersByTeam(match.away_team.id),
        ])
            .then(([home, away]) => setPlayers([...home, ...away]))
            .catch(() => setPlayers([]));
    }, [match.home_team.id, match.away_team.id]);

    const update = (index: number, patch: Partial<GoalEntry>) => {
        setEntries(prev => prev.map((e, i) => i === index ? { ...e, ...patch } : e));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const allFilled = entries.every(e => e.goalscorer && e.minute);
        if (!allFilled) {
            setError('Please fill in goalscorer and minute for all goals.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await createGoals(match.id, entries.map(entry => ({
                goalscorer: Number(entry.goalscorer),
                assist_player: entry.assist ? Number(entry.assist) : null,
                team_scored: entry.teamId,
                minute: Number(entry.minute),
                is_penalty: entry.isPenalty,
            })));
            window.location.reload();
        } catch (err) {
            const data = (err as { response?: { data?: unknown } })?.response?.data;
            if (data && typeof data === 'object') {
                const messages = Object.values(data as Record<string, string[]>).flat().join(' ');
                setError(messages || 'Failed to save goals.');
            } else {
                setError('Failed to save goals.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="add-goal-form" onSubmit={handleSubmit}>
            {entries.map((entry, i) => (
                <div key={i} className="add-goal-form__inline">
                    <select className="add-goal-form__select" value={entry.teamId} onChange={e => update(i, { teamId: Number(e.target.value) })}>
                        <option value={match.home_team.id}>{match.home_team.name}</option>
                        <option value={match.away_team.id}>{match.away_team.name}</option>
                    </select>
                    <select className="add-goal-form__select" value={entry.goalscorer} onChange={e => update(i, { goalscorer: e.target.value })}>
                        <option value="">— goalscorer —</option>
                        {players.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                    <select className="add-goal-form__select" value={entry.assist} onChange={e => update(i, { assist: e.target.value })}>
                        <option value="">— assist —</option>
                        {players.filter(p => String(p.id) !== entry.goalscorer).map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                    <input
                        className="add-goal-form__input add-goal-form__input--minute"
                        type="number"
                        placeholder="Min"
                        min={0}
                        max={125}
                        value={entry.minute}
                        onChange={e => update(i, { minute: e.target.value })}
                    />
                    <label className="add-goal-form__checkbox-label">
                        <input type="checkbox" checked={entry.isPenalty} onChange={e => update(i, { isPenalty: e.target.checked })} />
                        Penalty
                    </label>
                </div>
            ))}
            <button className="add-goal-form__btn btn btn-primary" type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Goals'}
            </button>
            {error && <p className="add-goal-form__error">{error}</p>}
        </form>
    );
};

export default AddGoalForm;
