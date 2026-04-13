import Navigation from '../../components/navigation/Navigation';
import Footer from '../../components/footer/Footer';
import './LeaguePage.css';

const LeaguePage = () => {
    return (
        <>
          <Navigation />
          <div className="league-tabs-container1">
          <section className="league-tabs-section">
            <div className="league-tabs-container">
              <div className="league-tabs-header">
                <h2 className="section-title"><text>Tournament Progress</text></h2>
                <p className="section-content">
                  <text>
                    Stay updated with MatchMates league standings and upcoming
                    matches.
                  </text>
                </p>
              </div>
              <div className="league-tabs-nav-wrapper">
                <div role="tablist" className="league-tabs-nav">
                  <button
                    id="tab-group"
                    role="tab"
                    aria-controls="panel-group"
                    aria-selected="true"
                    className="league-tabs-btn active"
                  >
                    <text>Group Stage</text>
                  </button>
                  <button
                    id="tab-knockout"
                    role="tab"
                    aria-controls="panel-knockout"
                    aria-selected="false"
                    className="league-tabs-btn"
                  >
                    <text>Knockout Phase</text>
                  </button>
                </div>
              </div>
              <div className="league-tabs-content">
                <div
                  id="panel-group"
                  role="tabpanel"
                  aria-labelledby="tab-group"
                  className="league-tabs-panel active"
                >
                  <div className="league-tabs-grid">
                    <div className="league-tabs-card">
                      <div className="league-tabs-card-header">
                        <span className="league-tabs-badge">
                          <text>Group A</text>
                        </span>
                        <span className="league-tabs-status"><text>Live</text></span>
                      </div>
                      <div className="league-tabs-match">
                        <div className="league-tabs-team">
                          <div className="league-tabs-team-icon">
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
                                  d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0M3 9h3v6H3zm15 0h3v6h-3z"
                                ></path>
                                <path
                                  d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm9-2v14"
                                ></path>
                              </g>
                            </svg>
                          </div>
                          <span className="section-content">
                            <text>Alpha Kings</text>
                          </span>
                        </div>
                        <div className="league-tabs-score">
                          <span className="section-title"><text>2</text></span>
                          <span className="section-content"><text>:</text></span>
                          <span className="section-title"><text>1</text></span>
                        </div>
                        <div className="league-tabs-team">
                          <div className="league-tabs-team-icon">
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
                                  d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0M3 9h3v6H3zm15 0h3v6h-3z"
                                ></path>
                                <path
                                  d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm9-2v14"
                                ></path>
                              </g>
                            </svg>
                          </div>
                          <span className="section-content">
                            <text>Beta Wolves</text>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="league-tabs-card">
                      <div className="league-tabs-card-header">
                        <span className="league-tabs-badge">
                          <text>Group B</text>
                        </span>
                        <span className="league-tabs-status">
                          <text>Upcoming</text>
                        </span>
                      </div>
                      <div className="league-tabs-match">
                        <div className="league-tabs-team">
                          <div className="league-tabs-team-icon">
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
                                  d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0M3 9h3v6H3zm15 0h3v6h-3z"
                                ></path>
                                <path
                                  d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm9-2v14"
                                ></path>
                              </g>
                            </svg>
                          </div>
                          <span className="section-content">
                            <text>Delta Squad</text>
                          </span>
                        </div>
                        <div className="league-tabs-score">
                          <span className="section-content"><text>vs</text></span>
                        </div>
                        <div className="league-tabs-team">
                          <div className="league-tabs-team-icon">
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
                                  d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0M3 9h3v6H3zm15 0h3v6h-3z"
                                ></path>
                                <path
                                  d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm9-2v14"
                                ></path>
                              </g>
                            </svg>
                          </div>
                          <span className="section-content">
                            <text>Gamma Force</text>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="panel-knockout"
                  role="tabpanel"
                  hidden
                  aria-labelledby="tab-knockout"
                  className="league-tabs-panel"
                >
                  <div className="league-tabs-placeholder">
                    <div className="league-tabs-placeholder-icon">
                      <svg
                        width="48"
                        xmlns="http://www.w3.org/2000/svg"
                        height="48"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 0 0-.629.74v.387q-1.24.235-2.445.564a.75.75 0 0 0-.552.698L1 4a5 5 0 0 0 4.506 4.976a6 6 0 0 0 2.946 1.822A6.5 6.5 0 0 1 7.768 13H7.5A1.5 1.5 0 0 0 6 14.5V17h-.75C4.56 17 4 17.56 4 18.25c0 .414.336.75.75.75h10.5a.75.75 0 0 0 .75-.75c0-.69-.56-1.25-1.25-1.25H14v-2.5a1.5 1.5 0 0 0-1.5-1.5h-.268a6.5 6.5 0 0 1-.684-2.202a6 6 0 0 0 2.946-1.822a5 5 0 0 0 4.503-5.152a.75.75 0 0 0-.552-.698A32 32 0 0 0 16 2.562v-.387a.75.75 0 0 0-.629-.74A33 33 0 0 0 10 1M2.525 4.422Q3.255 4.24 4 4.09V5c0 .74.134 1.448.38 2.103a3.5 3.5 0 0 1-1.855-2.68m14.95 0a3.5 3.5 0 0 1-1.854 2.68A6 6 0 0 0 16 5v-.91q.744.149 1.475.332"
                          fill="currentColor"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="section-subtitle">
                      <text>Knockout bracket coming soon</text>
                    </h3>
                    <p className="section-content">
                      <text>
                        The intensity builds! Check back once the group stages
                        conclude to see the final showdown bracket.
                      </text>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </>
    );
};

export default LeaguePage;