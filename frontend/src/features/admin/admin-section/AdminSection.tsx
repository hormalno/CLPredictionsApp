import { useEffect, useState } from "react";
import { getMatches } from '../../../api';
import AdminMatchFixture from "../../matches/admin-match-fixture/AdminMatchFixture";
import type { Match } from '../../../types'
import './AdminSection.css';

const PredictionSection = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getMatches()
        .then(setMatches)
        .catch(() => setError('Failed to load matches.'))
        .finally(() => setLoading(false));
    }, []);

    return (
        <section className="predictions-section">
            <div className="predictions-section-container">
                <div className="predictions-header">
                    <h2 className="section-title"><text>Recent Predictions</text></h2>
                </div>
                <div className="predictions-list">
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {matches.length > 0 && matches.map(match => (<AdminMatchFixture key={match.id} match={match}  />))}
                </div>
            </div>
        </section>
    )

};

export default PredictionSection;