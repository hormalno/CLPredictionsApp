import { useEffect, useState, useMemo } from "react";
import MatchFixture from "../../matches/match-fixture/MatchFixture";
import MatchUserScores from "../../matches/match-fixture/MatchUserScores";
import { getGroupStageMatches, getAllMatchesUserScores } from "../../../api";
import type { Match, MatchUserScore } from "../../../types";
import { groupByDate, formatSectionDate } from '../../../utils/dateConfig';
import './Fixtures.css';

const Fixtures = () => {
    const [matches, setMatches] = useState<Match[] | null>(null);
    const [userScores, setUserScores] = useState<MatchUserScore[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        Promise.all([getGroupStageMatches(),  getAllMatchesUserScores()])
        .then(([matchesData, userScoreData]) => {
            setMatches(matchesData);
            setUserScores(userScoreData)
        })
        .catch(() => setError('No matches found'))
        .finally(() => setLoading(false));
    }, []);

    const grouped = matches ? groupByDate(matches) : {} as Record<string, Match[]>;

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
                            <h2 className="predictions-section-title">{formatSectionDate(date)}</h2>
                        </div>
                        <div className="predictions-list">
                            {dayMatches.map((match) => (
                                <MatchFixture key={match.id} match={match} prediction={undefined}>
                                    {match.is_finished && <MatchUserScores scores={scoresByMatch.get(match.id) ?? []} />}
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