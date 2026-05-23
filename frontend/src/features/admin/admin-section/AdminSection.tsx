import { useEffect, useState } from "react";
import { getAdminMatches } from '../../../api';
import AdminMatchFixture from "../../matches/admin-match-fixture/AdminMatchFixture";
import type { MatchDetail } from '../../../types'
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

    return (
        <section className="admin-predictions-section">
            <div className="admin-predictions-section-container">
                <div className="admin-predictions-header">
                    <h2 className="section-title"><text>Recent Predictions</text></h2>
                </div>
                <div className="admin-predictions-list">
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {matches.length > 0 && matches.map(match => 
                        (<AdminMatchFixture key={match.id} match={match} onSave={() => setRefetch(r => r + 1)} />))}
                </div>
            </div>
        </section>
    )

};

export default AdminSection;