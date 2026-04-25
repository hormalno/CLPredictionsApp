import { mockMatches } from '../../../mocks';
import UpcomingMatchCard from '../../matches/upcoming-match-card/UpcomingMatchCard';
import './Upcoming.css'

const Upcoming = () => {
    return (
        <section className="upcoming-panel-section">
            <div className="upcoming-panel-container">
            <h2 className="section-title">Upcoming Matches Panel</h2>
            <p className="section-subtitle">
                Scrollable schedule of upcoming matches with time, teams, and fast
                picks.
            </p>
            <div className="upcoming-rail">
                {mockMatches.slice(0,4).map((match) => (<UpcomingMatchCard match={match} />))}
            </div>
            </div>
        </section>
    );
};

export default Upcoming;