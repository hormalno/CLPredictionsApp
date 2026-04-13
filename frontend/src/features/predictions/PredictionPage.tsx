import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";

const PredictionPage = () => {
    return (
        <>
            <Navigation />
            <div>
                <h1>My Predictions</h1>
                <p>This is where the user's predictions will be displayed.</p>
            </div>            
            <Footer />
        </>
    );
};

export default PredictionPage;