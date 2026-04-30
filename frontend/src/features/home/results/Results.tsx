import { useEffect, useRef, useState, useMemo } from "react";
import { getResults, getAllMatchUserScores } from "../../../api";

import MatchResultCard from '../../matches/match-result-card/MatchResultCard';
import type {Match, MatchUserScore} from '../../../types'
import './Results.css';

const Results = () => {
    const [results, setResults] = useState<Match[]>([]);
    const [userScores, setUserScores] = useState<MatchUserScore[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const railRef = useRef<HTMLDivElement>(null);
    const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

    useEffect(() => {
        Promise.all([getResults(), getAllMatchUserScores(4)])
        .then(([matchesData, userScoreData]) => {
            setResults(matchesData);
            setUserScores(userScoreData)
        })
        .catch(() => setError('No matches found'))
        .finally(() => setLoading(false));
    }, []);

    const scoresByMatch = useMemo(() =>
            userScores.reduce<Map<number, MatchUserScore[]>>((acc, s) => {
                const existing = acc.get(s.match) ?? [];
                acc.set(s.match, [...existing, s]);
                return acc;
            }, new Map()),[userScores]
        );

    const onMouseDown = (e: React.MouseEvent) => {
        const rail = railRef.current;
        if (!rail) return;
        drag.current = { active: true, startX: e.pageX - rail.offsetLeft, scrollLeft: rail.scrollLeft };
        rail.classList.add('dragging');
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!drag.current.active || !railRef.current) return;
        e.preventDefault();
        const x = e.pageX - railRef.current.offsetLeft;
        railRef.current.scrollLeft = drag.current.scrollLeft - (x - drag.current.startX);
    };

    const onMouseUp = () => {
        drag.current.active = false;
        railRef.current?.classList.remove('dragging');
    };

    return (
        <section className="results-snapshot-section">
            <div className="results-snapshot-container">
            <h2 className="section-title">Recent Results Snapshot</h2>
            <p className="section-subtitle">
                Compact list of latest match results and how friends scored.
            </p>
            <div
                className="results-rail"
                ref={railRef}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
            >
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {results && results.map((match) => {
                    const userScores = scoresByMatch.get(match.id);
                    return (<MatchResultCard match={match} userScores={userScores} />)
                })}
                {!loading && !error && !results?.length && <p>No finished matches yet!</p>}
            </div>
            </div>
        </section>
    );
};

export default Results;