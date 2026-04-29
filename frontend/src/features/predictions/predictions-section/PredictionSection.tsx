import { type Dispatch, type SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { getUserPredictions } from '../../../api/predictions';
import { getMatches } from "../../../api/matches";
import MatchFixture from "../../matches/match-fixture/MatchFixture";
import MyPrediction from "../../matches/match-fixture/MyPrediction";
import MatchPrediction from "../../matches/match-prediction/MatchPrediction";
import type { Match, MatchPrediction as MatchPredictionType } from '../../../types'


type Props = {
    predictions: MatchPredictionType[];
    setPredictions: Dispatch<SetStateAction<MatchPredictionType[]>>;
};

const PredictionSection = ({ predictions, setPredictions }: Props) => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const refreshPredictions = useCallback(() => {
        getUserPredictions()
        .then(setPredictions)
        .catch(() => {});
    }, [setPredictions]);

    useEffect(() => {
        const fetchMatches = getMatches()
            .then(setMatches)
            .catch(() => setError('Failed to load matches.'));

        Promise.all([fetchMatches, refreshPredictions()]).finally(() => setLoading(false));
    }, [refreshPredictions]);

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

                        if (match.is_closed) {

                            return (<MatchFixture key={match.id} match={match} prediction={prediction}>
                                        {prediction && <MyPrediction is_pending={!match.is_finished} prediction={prediction} />}
                                    </MatchFixture>)
                        }
                        
                        return <MatchPrediction key={match.id} match={match} prediction={prediction} onSaved={refreshPredictions} />
                    })}
                </div>
            </div>
        </section>
    )

};

export default PredictionSection;
