import { useCallback, useEffect, useMemo, useState } from "react";
import { getUserMatchPredictions, getGroupStageMatches } from '../../../api';
import MatchPrediction from "../../matches/match-prediction/MatchPrediction";
import type { Match, MatchPrediction as MatchPredictionType } from '../../../types';
import { groupByDate, formatSectionDate } from '../../../utils/dateConfig';
import { useProgressiveList } from '../../../hooks/useProgressiveList';
import './PredictionSection.css';

const PredictionSection = () => {
    const [predictions, setPredictions] = useState<MatchPredictionType[]>([]);
    const [matches, setMatches] = useState<Match[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const refreshPredictions = useCallback(() => {
        getUserMatchPredictions()
        .then(setPredictions)
        .catch(() => {});
    }, []);

    useEffect(() => {
        const fetchMatches = getGroupStageMatches()
            .then(setMatches)
            .catch(() => setError('Failed to load matches.'));

        Promise.all([fetchMatches, refreshPredictions()]).finally(() => setLoading(false));
    }, [refreshPredictions]);

    const predictionByMatch = useMemo(() =>
        new Map(predictions.map(p => [p.match, p])),
        [predictions]
    );

    const { visibleItems, sentinelRef } = useProgressiveList(matches, { batchSize: 6 });

    const grouped = useMemo(() => groupByDate(visibleItems), [visibleItems]);

    return (
        <section className="predictions-section">
            <div className="predictions-section-container">                
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && Object.entries(grouped).map(([date, dayMatches]) => (
                    <div key={date}>
                        <div className="predictions-header">
                            <h2 className="predictions-section-title">{formatSectionDate(date)}</h2>
                        </div>
                        <div className="predictions-list">
                            {dayMatches.map(match => {
                                const prediction = predictionByMatch.get(match.id);
                                return <MatchPrediction key={match.id} match={match} prediction={prediction} onSaved={refreshPredictions} />;
                            })}
                        </div>
                    </div>
                ))}
                <div ref={sentinelRef} />
            </div>
        </section>
    )

};

export default PredictionSection;
