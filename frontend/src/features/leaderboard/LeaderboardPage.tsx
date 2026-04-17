import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";
import './LeaderboardPage.css';
import Leaderboard from "./Leaderboard";

const LeaderboardPage = () => {
  return (
    <div className="leaderboard-container1">
          <Navigation />
          <section className="leaderboard-section">
            <div className="leaderboard-header">
              <h2 className="section-title">Leaderboard</h2>
              <p className="section-subtitle">
                See how you rank against colleagues and friends in the ultimate
                prediction arena.
              </p>
            </div>
            <Leaderboard />
          </section>
          <Footer></Footer>
        </div>
  );
};

export default LeaderboardPage;