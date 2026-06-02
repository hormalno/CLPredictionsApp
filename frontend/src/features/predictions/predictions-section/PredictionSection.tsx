import { useCallback, useEffect, useMemo, useState } from "react";
import { getUserMatchPredictions, getGroupStageMatches } from '../../../api';
import MatchPrediction from "../../matches/match-prediction/MatchPrediction";
import type { Match, MatchPrediction as MatchPredictionType } from '../../../types';
import './PredictionSection.css';

const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const weekday = d.toLocaleDateString('en-GB', { weekday: 'short' });
    const dayMonth = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
    return `${weekday}, ${dayMonth}`;
};

const groupByDate = (matches: Match[], timeZone = 'Europe/Sofia') =>
    matches.reduce<Record<string, Match[]>>((acc, match) => {
        const key = new Date(match.date).toLocaleDateString('sv-SE', { timeZone });
        (acc[key] ??= []).push(match);
        return acc;
    }, {});

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

    const grouped = useMemo(() => groupByDate(matches), [matches]);

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
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && Object.entries(grouped).map(([date, dayMatches]) => (
                    <div key={date}>
                        <div className="predictions-header">
                            <h2 className="predictions-section-title">{formatDate(date)}</h2>
                        </div>
                        <div className="predictions-list">
                            {dayMatches.map(match => {
                                const prediction = predictionByMatch.get(match.id);
                                return <MatchPrediction key={match.id} match={match} prediction={prediction} onSaved={refreshPredictions} />;
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )

};

export default PredictionSection;
