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
                <div className="upcoming-match-card">
                <div className="match-time">
                    <span>Tomorrow, 15:00</span>
                </div>
                <div className="match-teams-row">
                    <div className="match-team">
                    <span>CHE</span>
                    </div>
                    <div className="match-vs-small">
                    <span>vs</span>
                    </div>
                    <div className="match-team">
                    <span>MUN</span>
                    </div>
                </div>
                <button className="btn btn-outline btn-sm">
                    View Match
                </button>
                </div>
                <div className="upcoming-match-card">
                <div className="match-time">
                    <span>Sat, 18:30</span>
                </div>
                <div className="match-teams-row">
                    <div className="match-team">
                    <span>TOT</span>
                    </div>
                    <div className="match-vs-small">
                    <span>vs</span>
                    </div>
                    <div className="match-team">
                    <span>NEW</span>
                    </div>
                </div>
                <button className="btn btn-primary btn-sm">
                    View Match
                </button>
                </div>
                <div className="upcoming-match-card">
                <div className="match-time">
                    <span>Sat, 21:00</span>
                </div>
                <div className="match-teams-row">
                    <div className="match-team">
                    <span>PSG</span>
                    </div>
                    <div className="match-vs-small">
                    <span>vs</span>
                    </div>
                    <div className="match-team">
                    <span>LYO</span>
                    </div>
                </div>
                <button className="btn btn-primary btn-sm">
                    View Match
                </button>
                </div>
                <div className="upcoming-match-card">
                <div className="match-time">
                    <span>Sun, 14:00</span>
                </div>
                <div className="match-teams-row">
                    <div className="match-team">
                    <span>NAP</span>
                    </div>
                    <div className="match-vs-small">
                    <span>vs</span>
                    </div>
                    <div className="match-team">
                    <span>ROM</span>
                    </div>
                </div>
                <button className="btn btn-primary btn-sm">
                    View Match
                </button>
                </div>
            </div>
            </div>
        </section>
    );
};

export default Upcoming;