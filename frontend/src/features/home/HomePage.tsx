import Navigation from "../../components/navigation/Navigation"
import Footer from "../../components/footer/Footer"
import Rules from "./rules/Rules";
import Standings from "./standings/Standings";
import QuickHub from "./quick-hub/QuickHub";
import Results from "./results/Results";
import Upcoming from "./upcoming/Upcoming";
import "./HomePage.css";

const HomePage = () => {
    return (
        <div className="home-container1">
            <Navigation />
            <QuickHub />
            <Results />
            <Upcoming />
            <Standings />
            <Rules />
            <Footer />
        </div>
    );
};

export default HomePage;