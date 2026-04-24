import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";
import PredictionHeader from "./prediction-header/PredictionHeader";
import PredictionSummary from "./prediction-summary/PredictionSummary";
import MyPredictionFixture from "../matches/match-fixture/MyPredictionFixture";
import { mockMatches, mockPredictions } from "../../mocks";
import './PredictionPage.css';

const PredictionPage = () => {
    return (
        <>
            <Navigation />
            <PredictionHeader />
            <PredictionSummary />            
            <section className="predictions-section">
                <div className="predictions-section-container">
                    <div className="predictions-header">
                        <h2 className="section-title"><text>Recent Predictions</text></h2>
                        <div className="predictions-filters">
                            <button className="btn-sm btn-outline btn"><text>All</text></button>
                            <button className="btn-sm btn-outline btn">
                            <text>Correct</text>
                            </button>
                            <button className="btn-sm btn-outline btn">
                            <text>Pending</text>
                            </button>
                        </div>
                    </div>
                     <div className="predictions-list">
                        {mockMatches.map((match) => (<MyPredictionFixture key={match.id} match={match} predictedOutcome={mockPredictions[1]} />))}
                     </div>
                </div>
            </section> 
            <Footer />
        </>
    );
};

export default PredictionPage;