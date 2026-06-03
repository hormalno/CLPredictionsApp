import { useEffect, useMemo, useState } from "react";
import { getAdminMatches } from '../../../api';
import AdminMatchFixture from "../../matches/admin-match-fixture/AdminMatchFixture";
import type { MatchDetail } from '../../../types'
import { groupByDate, formatSectionDate } from '../../../utils/dateConfig';
import './AdminSection.css';

const AdminSection = () => {
    const [matches, setMatches] = useState<MatchDetail[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [refetch, setRefetch] = useState(0);

    useEffect(() => {
        getAdminMatches()
        .then(setMatches)
        .catch(() => setError('Failed to load matches.'))
        .finally(() => setLoading(false));
    }, [refetch]);

    const grouped = useMemo(() => groupByDate(matches), [matches]);

    return (
        <section className="admin-predictions-section">
            <div className="admin-predictions-section-container">
                <div className="admin-predictions-header">
                    <h2 className="section-title"><text>Recent Predictions</text></h2>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
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
            </div>
        </section>
    )

};

export default AdminSection;