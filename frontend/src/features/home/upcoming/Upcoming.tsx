import { useEffect, useState } from "react";
import { getUpcomingMatches } from '../../../api/matches';
import UpcomingMatchCard from '../../matches/upcoming-match-card/UpcomingMatchCard';
import type {Match} from '../../../types/match'
import './Upcoming.css'

const Upcoming = () => {
    const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        getUpcomingMatches()
        .then(data => { console.log('upcoming:', data); setUpcomingMatches(data); })
        .catch(() => setError('No upcoming match found'))
        .finally(() => setLoading(false));
    }, []);

    return (
        <section className="upcoming-panel-section">
            <div className="upcoming-panel-container">
            <h2 className="section-title">Upcoming Matches Panel</h2>
            <p className="section-subtitle">
                Scrollable schedule of upcoming matches with time, teams, and fast
                picks.
            </p>
            <div className="upcoming-rail">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {upcomingMatches.map((match) => (<UpcomingMatchCard match={match} />))}
                {!loading && !error && !upcomingMatches?.length && <p>No upcoming matches yet!</p>}
            </div>
            </div>
        </section>
    );
};

export default Upcoming;