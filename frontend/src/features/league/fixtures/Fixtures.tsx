import MatchFixture from "../../matches/match-fixture/MatchFixture";
import './Fixtures.css';

const Fixtures = () => {
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
                    <MatchFixture />
                    <MatchFixture />
                    <MatchFixture />
                    <MatchFixture />
                    <MatchFixture />
                    <MatchFixture />
                </div>
            </div>
        </section>
    );
};

export default Fixtures;