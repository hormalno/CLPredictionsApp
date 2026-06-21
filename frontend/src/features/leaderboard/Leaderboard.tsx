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

// Knockout rounds in bracket order, paired with the entry field holding the
// count of correct predicted teams for that round.
const KNOCKOUT_ROUNDS: { label: string; key: keyof LeaderboardEntry }[] = [
    { label: 'R32', key: 'knockout_R32_correct' },
    { label: 'R16', key: 'knockout_R16_correct' },
    { label: 'QF',  key: 'knockout_QF_correct' },
    { label: 'SF',  key: 'knockout_SF_correct' },
    { label: '3P',  key: 'knockout_3P_correct' },
    { label: 'F',   key: 'knockout_F_correct' },
];

const KNOCKOUT_DELIMITER = ' · ';

const KNOCKOUT_LEGEND = KNOCKOUT_ROUNDS.map(r => r.label).join(KNOCKOUT_DELIMITER);

// Hover explanations shown on each column header.
const COLUMN_HELP = {
    rank: 'Position on the leaderboard, ranked by points. Ties are broken by knockout outcomes, then correct outcomes, then exact scores, then single correct scores.',
    player: 'The player making the predictions.',
    points: 'Total points earned across all predictions.',
    knockout: `Correct predicted teams per knockout round, in order: ${KNOCKOUT_LEGEND}.`,
    outcomes: 'Number of group-stage matches where the predicted outcome (win/draw/loss) was correct.',
    exact: 'Number of group-stage matches with both scores correct, with the count of matches where only one team\'s score was correct shown in parentheses.',
    trend: 'Movement in rank since the last update.',
} as const;

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
    // Fixed-position custom tooltip (toast-styled). Fixed positioning is used so
    // it isn't clipped by the table wrapper's `overflow: hidden`.
    const [tip, setTip] = useState<{ text: string; x: number; y: number } | null>(null);

    const showTip = (text: string) => (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTip({ text, x: rect.left + rect.width / 2, y: rect.bottom });
    };
    const hideTip = () => setTip(null);

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
            {tip && (
                <div className="leaderboard-tooltip" role="tooltip" style={{ left: tip.x, top: tip.y + 8 }}>
                    {tip.text}
                </div>
            )}
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th scope="col"><span className="lb-help" aria-label={COLUMN_HELP.rank} onMouseEnter={showTip(COLUMN_HELP.rank)} onMouseLeave={hideTip}>Rank</span></th>
                        <th scope="col"><span className="lb-help" aria-label={COLUMN_HELP.player} onMouseEnter={showTip(COLUMN_HELP.player)} onMouseLeave={hideTip}>Player</span></th>
                        <th scope="col"><span className="lb-help" aria-label={COLUMN_HELP.points} onMouseEnter={showTip(COLUMN_HELP.points)} onMouseLeave={hideTip}>Points</span></th>
                        <th scope="col"><span className="lb-help" aria-label={COLUMN_HELP.knockout} onMouseEnter={showTip(COLUMN_HELP.knockout)} onMouseLeave={hideTip}>Knockout outcomes</span></th>
                        <th scope="col"><span className="lb-help" aria-label={COLUMN_HELP.outcomes} onMouseEnter={showTip(COLUMN_HELP.outcomes)} onMouseLeave={hideTip}>Correct outcomes</span></th>
                        <th scope="col"><span className="lb-help" aria-label={COLUMN_HELP.exact} onMouseEnter={showTip(COLUMN_HELP.exact)} onMouseLeave={hideTip}>Exact scores</span></th>
                        <th scope="col"><span className="lb-help" aria-label={COLUMN_HELP.trend} onMouseEnter={showTip(COLUMN_HELP.trend)} onMouseLeave={hideTip}>Trend</span></th>
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
                            <td className="tiebreak-cell knockout-cell">
                                <span title={KNOCKOUT_LEGEND}>
                                    {KNOCKOUT_ROUNDS.map(r => entry[r.key]).join(KNOCKOUT_DELIMITER)}
                                </span>
                            </td>
                            <td className="tiebreak-cell">
                                <span>{entry.outcome_count} </span>
                            </td>
                            <td className="tiebreak-cell">
                                <span>{entry.exact_count} ({entry.single_score_count})</span>
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
