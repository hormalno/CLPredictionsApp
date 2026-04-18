import { TrendUpIcon, TrendNeutralIcon, TrendDownIcon } from '../../components/icons/Icons';
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
                        <TrendUpIcon size={16} />
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
                        <TrendNeutralIcon size={24} />
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
                        <TrendDownIcon size={16} />
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
                        <TrendUpIcon size={16} />
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
                        <TrendUpIcon size={16} />
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
                        <TrendUpIcon size={16} />
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
                        <TrendUpIcon size={16} />
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
                        <TrendUpIcon size={16} />
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
                        <TrendUpIcon size={16} />
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
                        <TrendUpIcon size={16} />
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