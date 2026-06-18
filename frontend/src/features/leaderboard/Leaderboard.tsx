import { useEffect, useState } from 'react';
import { getLeaderboard, type LeaderboardEntry } from '../../api';
import { TrendUpIcon, TrendNeutralIcon, TrendDownIcon } from '../../components/icons/Icons';
import './Leaderboard.css';

const rankBadgeClass = (rank: number) => {
    if (rank === 1) return 'rank-badge first';
    if (rank === 2) return 'rank-badge second';
    if (rank === 3) return 'rank-badge third';
    return 'rank-badge';
};

const avatarInitials = (entry: LeaderboardEntry) => {
    if (entry.first_name && entry.last_name)
        return `${entry.first_name[0]}${entry.last_name[0]}`.toUpperCase();
    return entry.username.slice(0, 2).toUpperCase();
};

const TrendIndicator = ({ trend }: { trend: LeaderboardEntry['trend'] }) => {
    if (trend === 'up')   return <div className="up trend-indicator"><TrendUpIcon size={16} /></div>;
    if (trend === 'down') return <div className="down trend-indicator"><TrendDownIcon size={16} /></div>;
    return <div className="neutral trend-indicator"><TrendNeutralIcon size={24} /></div>;
};

type State =
    | { status: 'loading' }
    | { status: 'error'; message: string }
    | { status: 'ok'; entries: LeaderboardEntry[] };

type Props = {
    limit?: number;
};

const Leaderboard: React.FC<Props> = ({ limit }) => {
    const [state, setState] = useState<State>({ status: 'loading' });
    const [tick, setTick] = useState(0);

    useEffect(() => {
        getLeaderboard()
            .then(data => setState({ status: 'ok', entries: limit ? data.slice(0, limit) : data }))
            .catch(() => setState({ status: 'error', message: 'Failed to load leaderboard.' }));
    }, [tick, limit]);

    if (state.status === 'loading') return <div className="leaderboard-state">Loading…</div>;
    if (state.status === 'error')   return (
        <div className="leaderboard-state leaderboard-error">
            {state.message} <button onClick={() => setTick(t => t + 1)}>Retry</button>
        </div>
    );
    if (!state.entries.length) return <div className="leaderboard-state">No data yet.</div>;

    return (
        <div className="leaderboard-table-wrapper">
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th scope="col"><span>Rank</span></th>
                        <th scope="col"><span>Player Name</span></th>
                        <th scope="col"><span>Points / Score</span></th>
                        <th scope="col"><span title="Correct outcomes · Exact scores — used to break ties">Correct · Exact</span></th>
                        <th scope="col"><span>Trend</span></th>
                    </tr>
                </thead>
                <tbody>
                    {state.entries.map(entry => (
                        <tr key={entry.id} className={`leaderboard-row${entry.rank <= 3 ? ' top-rank' : ''}`}>
                            <td className="rank-cell">
                                <span className={rankBadgeClass(entry.rank)}>{entry.rank}</span>
                            </td>
                            <td className="player-cell">
                                <div className="player-info">
                                    <div className="player-avatar">
                                        <span>{avatarInitials(entry)}</span>
                                    </div>
                                    <span className="player-name">
                                        {entry.first_name && entry.last_name
                                            ? `${entry.first_name} ${entry.last_name}`
                                            : entry.username}
                                    </span>
                                </div>
                            </td>
                            <td className="score-cell">
                                <span>{entry.points.toLocaleString()}</span>
                            </td>
                            <td className="tiebreak-cell" title="Correct outcomes · Exact scores">
                                <span>{entry.outcome_count} · {entry.exact_count}</span>
                            </td>
                            <td className="trend-cell">
                                <TrendIndicator trend={entry.trend} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
