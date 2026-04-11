import Navigation from "../../components/navigation/Navigation"
import Footer from "../../components/footer/Footer"
import HowWorks from "./HowWorks";
import Standings from "./Standings";
import QuickHub from "./QuickHub";
import Results from "./Results";
import UpcomingPanel from "./UpcomingPanel";
import "./HomePage.css";

const HomePage = () => {
    return (
        <div className="home-container1">
            <Navigation />
            <QuickHub />
            <Results />
            <UpcomingPanel />
            <Standings />
            <HowWorks />
            <Footer />
        </div>
    );
};

export default HomePage;