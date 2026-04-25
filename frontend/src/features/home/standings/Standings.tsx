import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/button/Button';
import Leaderboard from '../../leaderboard/Leaderboard';
import './Standings.css'

const Standings = () => {
    const navigate = useNavigate();

    return (
        <section className="standings-preview-section">
            <div className="standings-preview-container">
                <div className="standings-header">
                    <h2 className="section-title">Friends &amp; Standings Preview</h2>
                    <p className="section-subtitle">
                        Compact leaderboard preview showing top friends and current ranks.
                    </p>
                    <Button variant="outline" size="lg" className="view-full-standings-btn" onClick={() => navigate('/leaderboard')}>
                        See Leaderboard
                    </Button>
                </div>
                <Leaderboard />          
            </div>
        </section>
    );
};

export default Standings;