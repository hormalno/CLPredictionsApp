import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";
import MatchFixture from "../matches/match-fixture/MatchFixture";
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
                        <svg
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                            d="M3 3v16a2 2 0 0 0 2 2h16M7 16h8m-8-5h12M7 6h3"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            ></path>
                        </svg>
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
                        <svg
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <g
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            >
                            <path
                                d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978m7-7.318v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978M18 9h1.5a1 1 0 0 0 0-5H18M4 22h16"
                            ></path>
                            <path
                                d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm0 0H4.5a1 1 0 0 1 0-5H6"
                            ></path>
                            </g>
                        </svg>
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
                <svg
                  fill="none"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
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
                <svg
                  fill="none"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
                <text>Next</text>
              </button>
            </div>
            <Footer />
        </>
    );
};

export default PredictionPage;