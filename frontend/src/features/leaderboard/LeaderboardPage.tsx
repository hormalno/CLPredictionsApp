import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";

const LeaderboardPage = () => {
  return (
    <div className="leaderboard-page">
        <Navigation />
        <div className="leaderboard-content">
            <h1>Leaderboard</h1>
            <p>This is where the leaderboard will be displayed.</p>
        </div>
        <Footer />
    </div>
  );
};

export default LeaderboardPage;