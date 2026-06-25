import { useEffect, useMemo, useState } from "react";
import { getAdminMatches } from '../../../api';
import AdminMatchFixture from "../../matches/admin-match-fixture/AdminMatchFixture";
import MatchFilter, { filterMatches, type FixtureFilter } from "../../../components/match-filter/MatchFilter";
import type { MatchDetail } from '../../../types'
import { groupByDate, formatSectionDate } from '../../../utils/dateConfig';
import { useProgressiveList } from '../../../hooks/useProgressiveList';
import './AdminSection.css';

const AdminSection = () => {
    const [matches, setMatches] = useState<MatchDetail[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [refetch, setRefetch] = useState(0);
    const [filter, setFilter] = useState<FixtureFilter>('upcoming');

    useEffect(() => {
        getAdminMatches()
        .then(setMatches)
        .catch(() => setError('Failed to load matches.'))
        .finally(() => setLoading(false));
    }, [refetch]);

    const filteredMatches = useMemo(
        () => filterMatches(matches, filter, m =>
            m.is_finished &&
            (((m.score_home_team ?? 0) + (m.score_away_team ?? 0)) === 0 || m.goals.length > 0)
        ),
        [matches, filter]
    );

    const { visibleItems, sentinelRef } = useProgressiveList(filteredMatches, { batchSize: 6 });

    const grouped = useMemo(() => groupByDate(visibleItems), [visibleItems]);

    return (
        <section className="admin-predictions-section">
            <div className="admin-predictions-section-container">
                <div className="admin-predictions-header">
                    <h2 className="section-title"><text>Recent Predictions</text></h2>
                    <MatchFilter value={filter} onChange={setFilter} />
                </div>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && Object.keys(grouped).length === 0 && (
                    <p>{filter === 'all' ? 'No matches.' : `No ${filter} matches.`}</p>
                )}
                {!loading && !error && Object.entries(grouped).map(([date, dayMatches]) => (
                    <div key={date}>
                        <div className="admin-predictions-header">
                            <h2 className="predictions-section-title">{formatSectionDate(date)}</h2>
                        </div>
                        <div className="admin-predictions-list">
                            {dayMatches.map(match =>
                                <AdminMatchFixture key={match.id} match={match} onSave={() => setRefetch(r => r + 1)} />
                            )}
                        </div>
                    </div>
                ))}
                <div ref={sentinelRef} />
            </div>
        </section>
    )

};

export default AdminSection;