import { Button } from '../../../components/button/Button';
import NextMatchCard from '../../matches/next-match-card/NextMatchCard';
import { mockMatches } from '../../../mocks/matches';
import './QuickHub.css';

const QuickHub = () => {
    return (
            <section className="quick-hub-section">
                <div className="quick-hub-bg">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        src="https://videos.pexels.com/video-files/35898933/15226936_360_640_30fps.mp4"
                        className="quick-hub-video"
                    ></video>
                    <div className="quick-hub-overlay"></div>
                </div>
                <div className="quick-hub-container">
                    <div className="quick-hub-grid">
                        <div className="quick-hub-content">
                            <h1 className="hero-title">
                                Predict. Compete. Win with MatchMates.
                            </h1>
                            <p className="hero-subtitle">
                                The ultimate match prediction site for you and your friends.
                                Track scores, climb the leaderboard, and claim bragging rights.
                            </p>
                            <div className="quick-hub-actions">
                                <Button variant="outline" size="lg">
                                    <span>Make a Prediction</span>
                                </Button>
                                <Button variant="outline" size="lg">
                                    <span>View Leaderboard</span>
                                </Button>
                            </div>
                        </div>
                        <div className="quick-hub-card-wrapper">
                            <NextMatchCard match={mockMatches[3]} />
                        </div>
                    </div>
                </div>
            </section>
    );
};

export default QuickHub;