import Navigation from "../../components/navigation/Navigation";
import { BarChartIcon, TrophyIcon, ChevronLeftIcon, ChevronRightIcon } from '../../components/icons/Icons';
import Footer from "../../components/footer/Footer";
import MatchFixture from "../matches/match-fixture/MatchFixture2";
import MatchPrediction from "../matches/match-prediction/MatchPrediction";
import './PredictionPage.css';

const PredictionPage = () => {
    const accuracy = 30;

    return (
        <>
            <Navigation />
            <section className="header-section">
                <div className="header-section-container">
                    <div className="header-section-card">
                    <h1 className="my-predictions-hero-title hero-title">
                        <text>My Predictions</text>
                    </h1>
                    <p className="hero-subtitle">
                        <text>
                        Track your performance and upcoming match forecasts with
                        MatchMates.
                        </text>
                    </p>
                    </div>
                </div>
            </section>
            <section className="summary-section">
                <div className="summary-section-container">
                    <div className="summary-section-grid">
                    <div className="summary-card">
                        <div className="summary-card-icon-wrapper">
                        <BarChartIcon size={24} />
                        </div>
                        <div className="summary-card-content">
                        <span className="summary-card-label">
                            <text>Total Predictions</text>
                        </span>
                        <h2 className="summary-card-value"><text>128</text></h2>
                        <p className="summary-card-meta">
                            <text>All-time activity</text>
                        </p>
                        </div>
                    </div>
                    <div className="summary-card accent">
                        <div className="summary-card-icon-wrapper">
                        <TrophyIcon size={24} />
                        </div>
                        <div className="summary-card-content">
                        <span className="summary-card-label">
                            <text>Accuracy Rate</text>
                        </span>
                        <h2 className="summary-card-value"><text>{accuracy}%</text></h2>
                        <div className="summary-card-progress-bar">
                            <div className="summary-card-progress-fill" style={{ width: `${accuracy}%` }}></div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
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
                        <MatchFixture />
                        <MatchFixture />
                        <MatchPrediction />
                     </div>
                </div>
            </section> 
             <div className="my-predictions-pagination-controls">
              <button
                className="pagination-btn button btn-outline btn"
              >
                <ChevronLeftIcon size={16} />
                <text>Previous</text>
              </button>
              <div className="my-predictions-pagination-numbers">
                <button className="btn-sm button btn pagination-number">
                  <text>1</text>
                </button>
                <button className="btn-sm button btn pagination-number">
                  <text>2</text>
                </button>
                <button className="btn-sm button btn pagination-number">
                  <text>3</text>
                </button>
                <span className="my-predictions-thq-pagination-ellipsis-elm">
                  <text>...</text>
                </span>
                <button className="btn-sm button btn pagination-number">
                  <text>12</text>
                </button>
              </div>
              <button className="pagination-btn button btn-outline btn">
                <ChevronRightIcon size={16} />
                <text>Next</text>
              </button>
            </div>
            <Footer />
        </>
    );
};

export default PredictionPage;