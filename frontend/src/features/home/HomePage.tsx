import Navigation from "../../components/navigation/Navigation"
import Footer from "../../components/footer/Footer"
import HowWorks from "./howWorks/HowWorks";
import Standings from "./standings/Standings";
import QuickHub from "./quickHub/QuickHub";
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
            <HowWorks />
            <Footer />
        </div>
    );
};

export default HomePage;