import { useEffect, useMemo, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";
import PredictionHeader from "./prediction-header/PredictionHeader";
import PredictionSummary from "./prediction-summary/PredictionSummary";
import SummaryCard from "./summary-card/SummaryCard";
import MyPredictionFixture from "../matches/match-fixture/MyPredictionFixture";
import MatchPrediction from "../matches/match-prediction/MatchPrediction";
import { getUserPredictions } from "../../api/predictions";
import { getMatches } from "../../api/matches";
import type { Match, MatchPrediction as MatchPredictionType, ScorePrediction } from "../../types";
import './PredictionPage.css';

const PredictionPage = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [matchPredictions, setMatchPredictions] = useState<MatchPredictionType[]>([]);
    const [scorePredictions, setScorePredictions] = useState<ScorePrediction[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const accuracy = 3
    // useMemo(() => {
    //     const closed = matches.filter(m => m.is_closed);
    //     if (closed.length === 0) return 0;
    //     const correct = closed.filter(p => p.correct_outcome).length;
    //     return Math.round((4 / 100) * 100);
    // }, [matches]);

    
    const refreshPredictions = () => {
        getUserPredictions()
        .then(data => {
            setMatchPredictions(data.match_predictions);
            setScorePredictions(data.score_predictions);
        })
        .catch(() => {});
    }

    useEffect(() => {
        const fetchMatches = getMatches()
            .then(setMatches)
            .catch(() => setError('Failed to load matches.'));

        Promise.all([fetchMatches, refreshPredictions()]).finally(() => setLoading(false));
    }, []);

    const predictionByMatch = useMemo(() =>
        new Map(matchPredictions.map(p => [p.match, p])),
        [matchPredictions]
    );

    const scoreByMatch = useMemo(() =>
        new Map(scorePredictions.map(p => [p.match, p])),
        [scorePredictions]
    );

    return (
        <>
            <Navigation />
            <PredictionHeader />
            <PredictionSummary>
                <SummaryCard variant="activity" icon="barChart" label="Total Predictions" value={matchPredictions.length} meta="All-time activity" />
                <SummaryCard variant="accuracy" icon="trophy" label="Accuracy Rate" value={`${accuracy}%`} progress={accuracy} />
            </PredictionSummary>
            <section className="predictions-section">
                <div className="predictions-section-container">
                    <div className="predictions-header">
                        <h2 className="section-title"><text>Recent Predictions</text></h2>
                        <div className="predictions-filters">
                            <button className="btn-sm btn-outline btn"><text>All</text></button>
                            <button className="btn-sm btn-outline btn"><text>Correct</text></button>
                            <button className="btn-sm btn-outline btn"><text>Pending</text></button>
                        </div>
                    </div>
                    <div className="predictions-list">
                        {loading && <p>Loading...</p>}
                        {error && <p>{error}</p>}
                        {!loading && !error && matches.map(match => {
                            if (match.is_closed) {
                                const prediction = predictionByMatch.get(match.id);
                                return <MyPredictionFixture key={match.id} match={match} predictedOutcome={prediction} />
                            }
                            
                            const score = scoreByMatch.get(match.id)
                            return <MatchPrediction key={match.id} match={match} existingScore={score} onSaved={refreshPredictions} />
                        })}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default PredictionPage;