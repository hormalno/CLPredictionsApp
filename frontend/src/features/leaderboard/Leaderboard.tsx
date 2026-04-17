import './Leaderboard.css';

const Leaderboard: React.FC = () => {
  return (
    <div className="leaderboard-table-wrapper">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th scope="col">
                      <span>Rank</span>
                    </th>
                    <th scope="col">
                      <span>Player Name</span>
                    </th>
                    <th scope="col">
                      <span>Points / Score</span>
                    </th>
                    <th scope="col">
                      <span>Trend</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="leaderboard-row top-rank">
                    <td className="rank-cell">
                      <span className="rank-badge first">1</span>
                    </td>
                    <td className="player-cell">
                      <div className="player-info">
                        <div className="player-avatar">
                          <span>JD</span>
                        </div>
                        <span className="player-name">
                          Jordan &quot;The Prophet&quot; Smith
                        </span>
                      </div>
                    </td>
                    <td className="score-cell">
                      <span>12,450</span>
                    </td>
                    <td className="trend-cell">
                      <div className="up trend-indicator">
                        <svg
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0"
                            fill="currentColor"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                        <span>+2</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="leaderboard-row">
                    <td className="rank-cell">
                      <span className="second rank-badge">2</span>
                    </td>
                    <td className="player-cell">
                      <div className="player-info">
                        <div className="player-avatar">
                          <span>AM</span>
                        </div>
                        <span className="player-name">Alex Martinez</span>
                      </div>
                    </td>
                    <td className="score-cell">
                      <span>11,920</span>
                    </td>
                    <td className="trend-cell">
                      <div className="neutral trend-indicator">
                        <svg
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M5 12h14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                        <span>0</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="leaderboard-row">
                    <td className="rank-cell">
                      <span className="third rank-badge">3</span>
                    </td>
                    <td className="player-cell">
                      <div className="player-info">
                        <div className="player-avatar">
                          <span>SW</span>
                        </div>
                        <span className="player-name">Sarah Wilson</span>
                      </div>
                    </td>
                    <td className="score-cell">
                      <span>11,840</span>
                    </td>
                    <td className="trend-cell">
                      <div className="trend-indicator down">
                        <svg
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M4.22 4.22a.75.75 0 0 0 0 1.06l5.22 5.22H5.75a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 .75-.75v-5.5a.75.75 0 0 0-1.5 0v3.69L5.28 4.22a.75.75 0 0 0-1.06 0"
                            fill="currentColor"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                        <span>-1</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="leaderboard-row">
                    <td className="rank-cell">
                      <span className="rank-badge">5</span>
                    </td>
                    <td className="player-cell">
                      <div className="player-info">
                        <div className="player-avatar">
                          <span>KC</span>
                        </div>
                        <span className="player-name">Kevin Chen</span>
                      </div>
                    </td>
                    <td className="score-cell">
                      <span>10,500</span>
                    </td>
                    <td className="trend-cell">
                      <div className="up trend-indicator">
                        <svg
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0"
                            fill="currentColor"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                        <span>+5</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="leaderboard-row">
                    <td className="rank-cell">
                      <span className="rank-badge">6</span>
                    </td>
                    <td className="player-cell">
                      <div className="player-info">
                        <div className="player-avatar">
                          <span>KC</span>
                        </div>
                        <span className="player-name">Kevin Chen</span>
                      </div>
                    </td>
                    <td className="score-cell">
                      <span>10,500</span>
                    </td>
                    <td className="trend-cell">
                      <div className="up trend-indicator">
                        <svg
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0"
                            fill="currentColor"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                        <span>+5</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="leaderboard-row">
                    <td className="rank-cell">
                      <span className="rank-badge">7</span>
                    </td>
                    <td className="player-cell">
                      <div className="player-info">
                        <div className="player-avatar">
                          <span>KC</span>
                        </div>
                        <span className="player-name">Kevin Chen</span>
                      </div>
                    </td>
                    <td className="score-cell">
                      <span>10,500</span>
                    </td>
                    <td className="trend-cell">
                      <div className="up trend-indicator">
                        <svg
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0"
                            fill="currentColor"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                        <span>+5</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="leaderboard-row">
                    <td className="rank-cell">
                      <span className="rank-badge">8</span>
                    </td>
                    <td className="player-cell">
                      <div className="player-info">
                        <div className="player-avatar">
                          <span>KC</span>
                        </div>
                        <span className="player-name">Kevin Chen</span>
                      </div>
                    </td>
                    <td className="score-cell">
                      <span>10,500</span>
                    </td>
                    <td className="trend-cell">
                      <div className="up trend-indicator">
                        <svg
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0"
                            fill="currentColor"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                        <span>+5</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="leaderboard-row">
                    <td className="rank-cell">
                      <span className="rank-badge">9</span>
                    </td>
                    <td className="player-cell">
                      <div className="player-info">
                        <div className="player-avatar">
                          <span>KC</span>
                        </div>
                        <span className="player-name">Kevin Chen</span>
                      </div>
                    </td>
                    <td className="score-cell">
                      <span>10,500</span>
                    </td>
                    <td className="trend-cell">
                      <div className="up trend-indicator">
                        <svg
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0"
                            fill="currentColor"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                        <span>+5</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="leaderboard-row">
                    <td className="rank-cell">
                      <span className="rank-badge">10</span>
                    </td>
                    <td className="player-cell">
                      <div className="player-info">
                        <div className="player-avatar">
                          <span>KC</span>
                        </div>
                        <span className="player-name">Kevin Chen</span>
                      </div>
                    </td>
                    <td className="score-cell">
                      <span>10,500</span>
                    </td>
                    <td className="trend-cell">
                      <div className="up trend-indicator">
                        <svg
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0"
                            fill="currentColor"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                        <span>+5</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="leaderboard-row">
                    <td className="rank-cell">
                      <span className="rank-badge">11</span>
                    </td>
                    <td className="player-cell">
                      <div className="player-info">
                        <div className="player-avatar">
                          <span>KC</span>
                        </div>
                        <span className="player-name">Kevin Chen</span>
                      </div>
                    </td>
                    <td className="score-cell">
                      <span>10,500</span>
                    </td>
                    <td className="trend-cell">
                      <div className="up trend-indicator">
                        <svg
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0"
                            fill="currentColor"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                        <span>+5</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  );
};

export default Leaderboard;