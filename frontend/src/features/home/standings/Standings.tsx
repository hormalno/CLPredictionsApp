import { Button } from '../../../components/button/Button';
import './Standings.css'

const Standings = () => {
    return (
        <section className="standings-preview-section">
            <div className="standings-preview-container">
            <div className="standings-header">
                <h2 className="section-title">Friends &amp; Standings Preview</h2>
                <p className="section-subtitle">
                Compact leaderboard preview showing top friends and current ranks.
                </p>
                <Button className="view-full-standings-btn" variant="primary" size="md">
                    See Leaderboard
                </Button>
            </div>
            <div className="standings-table-wrapper">
                <table className="standings-table">
                <thead>
                    <tr>
                    <th>
                        <span>Rank</span>
                    </th>
                    <th>
                        <span>Friend</span>
                    </th>
                    <th>
                        <span>Points</span>
                    </th>
                    <th>
                        <span>Recent Change</span>
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>
                        <span className="rank-badge gold">1</span>
                    </td>
                    <td>
                        <span>Alex &quot;The Oracle&quot;</span>
                    </td>
                    <td>
                        <span>452</span>
                    </td>
                    <td>
                        <span className="change-up">+24</span>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        <span className="rank-badge silver">2</span>
                    </td>
                    <td>
                        <span>Jordan P.</span>
                    </td>
                    <td>
                        <span>421</span>
                    </td>
                    <td>
                        <span className="change-up">+12</span>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        <span className="rank-badge bronze">3</span>
                    </td>
                    <td>
                        <span>Sam Wise</span>
                    </td>
                    <td>
                        <span>418</span>
                    </td>
                    <td>
                        <span className="change-down">-5</span>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        <span className="rank-badge">4</span>
                    </td>
                    <td>
                        <span>Casey Miller</span>
                    </td>
                    <td>
                        <span>395</span>
                    </td>
                    <td>
                        <span className="change-up">+8</span>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        <span className="rank-badge">5</span>
                    </td>
                    <td>
                        <span>Taylor Swift-Kick</span>
                    </td>
                    <td>
                        <span>382</span>
                    </td>
                    <td>
                        <span className="change-neutral">0</span>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>            
            </div>
        </section>
    );
};

export default Standings;