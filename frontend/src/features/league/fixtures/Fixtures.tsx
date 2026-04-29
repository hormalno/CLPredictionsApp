import { useEffect, useState, useMemo } from "react";
import MatchFixture from "../../matches/match-fixture/MatchFixture";
import UserScores from "../../matches/match-fixture/UserScores";
import { getMatches } from "../../../api/matches";
import { getMatchUserScores } from "../../../api/predictions";
import type { Match, MatchUserScore } from "../../../types";
import './Fixtures.css';


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

const Fixtures = () => {
    const [matches, setMatches] = useState<Match[] | null>(null);
    const [userScores, setUserScores] = useState<MatchUserScore[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        Promise.all([getMatches(),  getMatchUserScores()])
        .then(([matchesData, userScoreData]) => {
            setMatches(matchesData);
            setUserScores(userScoreData)
        })
        .catch(() => setError('No matches found'))
        .finally(() => setLoading(false));
    }, []);

    const grouped = matches ? groupByDate(matches) : {};

    const scoresByMatch = useMemo(() =>
        userScores.reduce<Map<number, MatchUserScore[]>>((acc, s) => {
            const existing = acc.get(s.match) ?? [];
            acc.set(s.match, [...existing, s]);
            return acc;
        }, new Map()),[userScores]
    );

    return (
        <section className="predictions-section">
            <div className="predictions-section-container">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {Object.entries(grouped).map(([date, dayMatches]) => (
                    <div key={date}>
                        <div className="predictions-header">
                            <h2 className="predictions-section-title">{formatDate(date)}</h2>
                        </div>
                        <div className="predictions-list">
                            {dayMatches.map((match) => (
                                <MatchFixture key={match.id} match={match} prediction={undefined}>
                                    {match.is_finished && <UserScores scores={scoresByMatch.get(match.id) ?? []} />}
                                </MatchFixture>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Fixtures;