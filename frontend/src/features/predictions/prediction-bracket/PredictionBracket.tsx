import { useEffect, useRef, useState } from 'react';
import { getKnockoutMatches, getUserKnockoutPredictions, getTeams, getGroups } from '../../../api';
import KnockoutPrediction from '../../matches/knockout-prediction/KnockoutPrediction';
import type { KnockoutPrediction as KnockoutPredictionType, Match, Team } from '../../../types';
import './PredictionBracket.css';

const ROUNDS = [
    { key: 'PO',  label: 'Play-off' },
    { key: 'R32', label: 'Round of 32' },
    { key: 'R16', label: 'Round of 16' },
    { key: 'QF',  label: 'Quarterfinal' },
    { key: 'SF',  label: 'Semifinal' },
    { key: 'F',   label: 'Final' },
];

const WINDOW = 3;

type MatchWithPrediction = {
    match: Match;
    prediction: KnockoutPredictionType | undefined;
};

const GROUP_PLACEHOLDER_RE = /^[12]([A-L])$/;

function filterTeamsForPlaceholder(placeholder: string, allTeams: Team[], groupTeamIds: Record<string, number[]>): Team[] {
    const m = placeholder.match(GROUP_PLACEHOLDER_RE);
    if (!m) return allTeams;
    const ids = new Set(groupTeamIds[m[1]] ?? []);
    return allTeams.filter(t => ids.has(t.id));
}

const PredictionBracket = () => {
    const [matchesByRound, setMatchesByRound] = useState<Record<string, MatchWithPrediction[]>>({});
    const [teams, setTeams] = useState<Team[]>([]);
    const [groupTeamIds, setGroupTeamIds] = useState<Record<string, number[]>>({});
    const [offset, setOffset] = useState(0);
    const [dir, setDir] = useState<'forward' | 'backward'>('forward');
    const sectionRef = useRef<HTMLElement>(null);
    const isFirstRender = useRef(true);
    const matchesRef = useRef<Match[]>([]);

    const mergePredictions = (matches: Match[], predictions: KnockoutPredictionType[]) => {
        const predByMatch = new Map(predictions.map(p => [p.match, p]));
        return matches.reduce<Record<string, MatchWithPrediction[]>>((acc, m) => {
            (acc[m.round] ??= []).push({ match: m, prediction: predByMatch.get(m.id) });
            return acc;
        }, {});
    };

    const refreshPredictions = () => {
        getUserKnockoutPredictions().then(predictions => {
            setMatchesByRound(mergePredictions(matchesRef.current, predictions));
        });
    };

    useEffect(() => {
        Promise.all([
            getKnockoutMatches(),
            getUserKnockoutPredictions(),
            getTeams(),
            getGroups(),
        ]).then(([matches, predictions, allTeams, groups]) => {
            matchesRef.current = matches;
            setMatchesByRound(mergePredictions(matches, predictions));
            setTeams(allTeams);
            setGroupTeamIds(Object.fromEntries(groups.map(g => [g.name, g.teams.map(t => t.id)])));
        });
    }, []);

    const r32UsedTeamIds = new Set<number>(
        (matchesByRound['R32'] ?? []).flatMap(({ prediction }) => [
            prediction?.predicted_home_team?.id,
            prediction?.predicted_away_team?.id,
        ]).filter((id): id is number => id != null)
    );

    const activeRounds = ROUNDS.filter(r => matchesByRound[r.key]?.length);
    const canPrev = offset > 0;
    const canNext = offset + WINDOW < activeRounds.length;
    const visibleRounds = activeRounds.slice(offset, offset + WINDOW);

    useEffect(() => {
        if (isFirstRender.current) { isFirstRender.current = false; return; }
        if (!sectionRef.current) return;
        const top = sectionRef.current.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: 'smooth' });
    }, [offset]);

    const handlePrev = () => { setDir('backward'); setOffset(o => o - 1); };
    const handleNext = () => { setDir('forward');  setOffset(o => o + 1); };

    return (
        <section ref={sectionRef} id="prediction-bracket-section" className="tournament-prediction-bracket">
            <div className="bracket-sticky-header">
                <div className="bracket-sticky-header-inner">
                    <button
                        className="bracket-nav-btn"
                        onClick={handlePrev}
                        disabled={!canPrev}
                        aria-label="Previous rounds"
                    >
                        ‹
                    </button>
                    {visibleRounds.map(round => (
                        <h2 key={round.key} className="section-subtitle">{round.label}</h2>
                    ))}
                    <button
                        className="bracket-nav-btn"
                        onClick={handleNext}
                        disabled={!canNext}
                        aria-label="Next rounds"
                    >
                        ›
                    </button>
                </div>
            </div>

            <div key={offset} className={`tournament-prediction-bracket-grid bracket-enter-${dir}`}>
                <div className="bracket-spacer" />
                {visibleRounds.map((round, idx) => {
                    const items = matchesByRound[round.key] ?? [];
                    return (
                        <div
                            key={round.key}
                            data-round={items.length}
                            className={`bracket-round${idx === visibleRounds.length - 1 ? ' bracket-round--last' : ''}`}
                        >
                            <div className="bracket-matches">
                                {round.key === 'F'
                                    ? items.map(({ match, prediction }) => (
                                        <KnockoutPrediction
                                            key={match.id}
                                            match={match}
                                            prediction={prediction}
                                            homeTeams={filterTeamsForPlaceholder(match.home_placeholder, teams, groupTeamIds)}
                                            awayTeams={filterTeamsForPlaceholder(match.away_placeholder, teams, groupTeamIds)}
                                            usedTeamIds={round.key === 'R32' ? r32UsedTeamIds : undefined}
                                            canSelectTeams={round.key === 'R32'}
                                            onSaved={refreshPredictions}
                                        />
                                    ))
                                    : items.reduce<MatchWithPrediction[][]>((pairs, item, i) => {
                                        if (i % 2 === 0) pairs.push([item]);
                                        else pairs[pairs.length - 1].push(item);
                                        return pairs;
                                    }, []).map((pair, i) => (
                                        <div key={i} className="bracket-pair">
                                            <div className="match-slot">
                                                <KnockoutPrediction
                                                    match={pair[0].match}
                                                    prediction={pair[0].prediction}
                                                    homeTeams={filterTeamsForPlaceholder(pair[0].match.home_placeholder, teams, groupTeamIds)}
                                                    awayTeams={filterTeamsForPlaceholder(pair[0].match.away_placeholder, teams, groupTeamIds)}
                                                    usedTeamIds={round.key === 'R32' ? r32UsedTeamIds : undefined}
                                                    canSelectTeams={round.key === 'R32'}
                                                    onSaved={refreshPredictions}
                                                />
                                            </div>
                                            {pair[1] && (
                                                <div className="match-slot">
                                                    <KnockoutPrediction
                                                        match={pair[1].match}
                                                        prediction={pair[1].prediction}
                                                        homeTeams={filterTeamsForPlaceholder(pair[1].match.home_placeholder, teams, groupTeamIds)}
                                                        awayTeams={filterTeamsForPlaceholder(pair[1].match.away_placeholder, teams, groupTeamIds)}
                                                        usedTeamIds={round.key === 'R32' ? r32UsedTeamIds : undefined}
                                                        canSelectTeams={round.key === 'R32'}
                                                        onSaved={refreshPredictions}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    );
                })}
                <div className="bracket-spacer" />
            </div>
        </section>
    );
};

export default PredictionBracket;
