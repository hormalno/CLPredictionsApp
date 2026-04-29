import { type Dispatch, type SetStateAction, useEffect, useMemo, useState } from "react";
import { getUserPredictions } from '../../../api/predictions';
import { getMatches } from "../../../api/matches";
import MatchFixture from "../../matches/match-fixture/MatchFixture";
import type { Match, MatchPrediction } from '../../../types'
import MyPrediction from "../../matches/match-fixture/MyPrediction";

type Props = {
    predictions: MatchPrediction[];
    setPredictions: Dispatch<SetStateAction<MatchPrediction[]>>;
};

const PredictionSection = ({ predictions, setPredictions }: Props) => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const refreshPredictions = () => {
        getUserPredictions()
        .then(setPredictions)
        .catch(() => {});
    }

    useEffect(() => {
        const fetchMatches = getMatches()
            .then(setMatches)
            .catch(() => setError('Failed to load matches.'));

        Promise.all([fetchMatches, refreshPredictions()]).finally(() => setLoading(false));
    }, []);

    const predictionByMatch = useMemo(() =>
        new Map(predictions.map(p => [p.match, p])),
        [predictions]
    );

    return (
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
                        const prediction = predictionByMatch.get(match.id);

                        // if (match.is_closed) {

                            return (<MatchFixture key={match.id} match={match}>
                                        <MyPrediction is_pending={!match.is_finished} prediction={prediction} />
                                    </MatchFixture>)
                        // }

                        // const score = scoreByMatch.get(match.id)
                        // return <MatchPrediction key={match.id} match={match} existingScore={score} onSaved={refreshPredictions} />
                    })}
                </div>
            </div>
        </section>
    )

};

export default PredictionSection;
