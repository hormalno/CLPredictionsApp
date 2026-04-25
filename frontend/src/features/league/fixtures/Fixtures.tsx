import { useEffect, useState } from "react";
import MatchFixture from "../../matches/match-fixture/MatchFixture";
import { getMatches } from "../../../api/matches";
import type { Match } from "../../../types";
import './Fixtures.css';

const Fixtures = () => {
    const [matches, setMatches] = useState<Match[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getMatches()
        .then(setMatches)
        .catch(() => setError('No matches found'))
        .finally(() => setLoading(false));
    }, []);

    return (
        <section className="predictions-section">
            <div className="predictions-section-container">
                <div className="predictions-header">
                <h2 className="section-title"><text>Round 1</text></h2>
                <div className="predictions-filters">
                    <button className="btn-sm btn-outline btn">
                        <text>All</text>
                    </button>
                    <button className="btn-sm btn-outline btn">
                    <text>Correct</text>
                    </button>
                    <button className="btn-sm btn-outline btn">
                    <text>Pending</text>
                    </button>
                </div>
                </div>
                <div className="predictions-list">
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {matches && matches.map((match) => (<MatchFixture key={match.id} match={match}  />))}
                </div>
            </div>
        </section>
    );
};

export default Fixtures;