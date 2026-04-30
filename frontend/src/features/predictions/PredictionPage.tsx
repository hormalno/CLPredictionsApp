import { useEffect, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";
import PredictionHeader from "./prediction-header/PredictionHeader";
import PredictionSummary from "./prediction-summary/PredictionSummary";
import PredictionSection from "./predictions-section/PredictionSection";
import { getUserPredictions } from "../../api";
import type { MatchPrediction } from "../../types";
import './PredictionPage.css';

const PredictionPage = () => {
    const [predictions, setPredictions] = useState<MatchPrediction[]>([]);

    useEffect(() => {
        getUserPredictions().then(setPredictions).catch(() => {});
    }, []);

    return (
        <>
            <Navigation />
            <PredictionHeader />
            <PredictionSummary predictions={predictions} />
            <PredictionSection predictions={predictions} setPredictions={setPredictions} />
            <Footer />
        </>
    );
};

export default PredictionPage;
