import { mockMatches } from '../../../mocks';
import MatchResultCard from '../../matches/match-result-card/MatchResultCard';
import './Results.css';

const Results = () => {
    return (
        <section className="results-snapshot-section">
            <div className="results-snapshot-container">
            <h2 className="section-title">Recent Results Snapshot</h2>
            <p className="section-subtitle">
                Compact list of latest match results and how friends scored.
            </p>
            <div className="results-rail">
                 {mockMatches.slice(1,5).map((match) => (<MatchResultCard match={match} />))}              
            </div>
            </div>
        </section>
    );
};

export default Results;