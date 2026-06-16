import { useEffect, useRef, useState } from 'react';
import { getKnockoutMatches, getUserKnockoutPredictions, getGroups } from '../../../api';
import KnockoutPrediction from '../../matches/knockout-prediction/KnockoutPrediction';
import type { KnockoutPrediction as KnockoutPredictionType, Match, Team, Group } from '../../../types';
import './PredictionBracket.css';
import FinalOutcome from '../../matches/knockout-prediction/FinalOutcome';
import PredictWinner from '../../matches/knockout-prediction/PredictWinner';
import TeamSelector from '../../matches/knockout-prediction/TeamSelector';
import { ROUND_MATCH_ORDER } from '../../matches/knockoutMatchOrder';

const ROUNDS = [
    { key: 'PO',  label: 'Play-off' },
    { key: 'R32', label: 'Round of 32' },
    { key: 'R16', label: 'Round of 16' },
    { key: 'QF',  label: 'Quarterfinal' },
    { key: 'SF',  label: 'Semifinal' },
    { key: 'F',   label: 'Final' },
];

const DESKTOP_WINDOW = 3;
const MOBILE_WINDOW = 1;
const MOBILE_BREAKPOINT = 767;

type MatchWithPrediction = {
    match: Match;
    prediction: KnockoutPredictionType | undefined;
};

function toTeam(t: Group['teams'][number], groupName: string): Team {
    return { id: t.id, name: t.name, short_name: t.short_name, logo: t.logo, group_name: groupName };
}

function filterTeamsForR32(match: Match, slot: 'home' | 'away', groups: Group[]): Team[] {
    const matchId = match.match_id;
    if (!matchId) return [];

    const p1Group = groups.find(g => g.next_p1 === matchId && g.slot_p1 === slot);
    if (p1Group) return p1Group.teams.map(t => toTeam(t, p1Group.name));

    const p2Group = groups.find(g => g.next_p2 === matchId && g.slot_p2 === slot);
    if (p2Group) return p2Group.teams.map(t => toTeam(t, p2Group.name));

    const p3Groups = groups.filter(g => g.next_p3.includes(matchId) && g.slot_p3 === slot);
    if (p3Groups.length) {
        const seen = new Set<number>();
        return p3Groups.flatMap(g => g.teams.map(t => toTeam(t, g.name))).filter(t => {
            if (seen.has(t.id)) return false;
            seen.add(t.id);
            return true;
        });
    }

    return [];
}

const PredictionBracket = () => {
    const [matchesByRound, setMatchesByRound] = useState<Record<string, MatchWithPrediction[]>>({});
    const [groups, setGroups] = useState<Group[]>([]);
    const [offset, setOffset] = useState(0);
    const [dir, setDir] = useState<'forward' | 'backward'>('forward');
    const [windowSize, setWindowSize] = useState(() =>
        typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT ? MOBILE_WINDOW : DESKTOP_WINDOW
    );
    const sectionRef = useRef<HTMLElement>(null);
    const userNavigated = useRef(false);
    const matchesRef = useRef<Match[]>([]);

    useEffect(() => {
        const onResize = () => setWindowSize(window.innerWidth <= MOBILE_BREAKPOINT ? MOBILE_WINDOW : DESKTOP_WINDOW);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

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
            getGroups(),
        ]).then(([matches, predictions, groups]) => {
            matchesRef.current = matches;
            setMatchesByRound(mergePredictions(matches, predictions));
            setGroups(groups);

            // Start on the first round that still has pending matches (leftmost).
            // If every round is finished, land on the last round.
            const active = ROUNDS.filter(r => matches.some(m => m.round === r.key));
            const firstPending = active.findIndex(r => matches.some(m => m.round === r.key && !m.is_finished));
            const targetIdx = firstPending === -1 ? active.length - 1 : firstPending;
            const ws = window.innerWidth <= MOBILE_BREAKPOINT ? MOBILE_WINDOW : DESKTOP_WINDOW;
            const maxOffset = Math.max(0, active.length - ws);
            setOffset(Math.min(Math.max(0, targetIdx), maxOffset));
        });
    }, []);

    const sfOrder = ROUND_MATCH_ORDER['SF'] ?? [];
    const sortedSF = [...(matchesByRound['SF'] ?? [])].sort((a, b) => {
        const ai = sfOrder.indexOf(a.match.match_id ?? -1);
        const bi = sfOrder.indexOf(b.match.match_id ?? -1);
        return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
    });

    const getSFLoser = (sf: MatchWithPrediction): Team | null => {
        const { prediction } = sf;
        if (!prediction?.predicted_winner) return null;
        const home = prediction.predicted_home_team ?? sf.match.home_team;
        const away = prediction.predicted_away_team ?? sf.match.away_team;
        return prediction.predicted_winner.id === home?.id ? away : home;
    };

    const sf1Loser = sortedSF[0] ? getSFLoser(sortedSF[0]) : null;
    const sf2Loser = sortedSF[1] ? getSFLoser(sortedSF[1]) : null;

    const r32UsedTeamIds = new Set<number>(
        (matchesByRound['R32'] ?? []).flatMap(({ prediction }) => [
            prediction?.predicted_home_team?.id,
            prediction?.predicted_away_team?.id,
        ]).filter((id): id is number => id != null)
    );

    const activeRounds = ROUNDS.filter(r => matchesByRound[r.key]?.length);

    useEffect(() => {
        setOffset(o => Math.min(o, Math.max(0, activeRounds.length - windowSize)));
    }, [windowSize, activeRounds.length]);

    const canPrev = offset > 0;
    const canNext = offset + windowSize < activeRounds.length;
    const visibleRounds = activeRounds.slice(offset, offset + windowSize);

    useEffect(() => {
        if (!userNavigated.current) return;
        if (!sectionRef.current) return;
        const top = sectionRef.current.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: 'smooth' });
    }, [offset]);

    const handlePrev = () => { userNavigated.current = true; setDir('backward'); setOffset(o => o - 1); };
    const handleNext = () => { userNavigated.current = true; setDir('forward');  setOffset(o => o + 1); };

    const renderKnockoutMatches = (match : Match, prediction : KnockoutPredictionType | undefined, round : string) => (
        <div className="match-slot">
            <KnockoutPrediction match={match} >
                {match.is_closed
                ?  <FinalOutcome match={match} prediction={prediction} />
                :  round === 'R32' 
                    ?    (<TeamSelector
                            match={match}
                            prediction={prediction}
                            homeTeams={filterTeamsForR32(match, 'home', groups)}
                            awayTeams={filterTeamsForR32(match, 'away', groups)}
                            usedTeamIds={r32UsedTeamIds}
                            onSaved={refreshPredictions}
                        />)
                    : <PredictWinner match={match} prediction={prediction} onSaved={refreshPredictions} />}
            </KnockoutPrediction>
        </div>
    )

    return (
        <section ref={sectionRef} id="prediction-bracket-section" className="tournament-prediction-bracket tournament-bracket--paged">
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
                    const rawItems = matchesByRound[round.key] ?? [];
                    const order = ROUND_MATCH_ORDER[round.key] ?? [];
                    const items: MatchWithPrediction[] = order.length
                        ? [...rawItems].sort((a, b) => {
                            const ai = order.indexOf(a.match.match_id ?? -1);
                            const bi = order.indexOf(b.match.match_id ?? -1);
                            return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
                          })
                        : rawItems;
                    return (
                        <div
                            key={round.key}
                            data-round={items.length}
                            className={`bracket-round${idx === visibleRounds.length - 1 ? ' bracket-round--last' : ''}`}
                        >
                            <div className="bracket-matches">
                                {round.key === 'F'
                                ? (
                                    <>
                                        {items.map(({ match, prediction }) => renderKnockoutMatches(match, prediction, round.key))}
                                        {(matchesByRound['3P'] ?? []).length > 0 && (
                                            <div className="third-place-section">
                                                <span className="third-place-label">3rd Place</span>
                                                <div className="third-place-match-wrapper">
                                                    {(matchesByRound['3P'] ?? []).map(({ match, prediction }) => {
                                                        const patchedMatch = {
                                                            ...match,
                                                            home_team: sf1Loser ?? match.home_team,
                                                            away_team: sf2Loser ?? match.away_team,
                                                        };
                                                        const patchedPrediction = prediction ? {
                                                            ...prediction,
                                                            predicted_home_team: sf1Loser ?? prediction.predicted_home_team,
                                                            predicted_away_team: sf2Loser ?? prediction.predicted_away_team,
                                                        } : prediction;
                                                        return (
                                                            <div key={`${sf1Loser?.id}-${sf2Loser?.id}`}>
                                                                {renderKnockoutMatches(patchedMatch, patchedPrediction, '3P')}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )
                                :
                                    items.reduce<MatchWithPrediction[][]>((pairs, item, i) => {
                                        if (i % 2 === 0) pairs.push([item]);
                                        else pairs[pairs.length - 1].push(item);
                                        return pairs;
                                    }, []).map((pair, i) => (
                                        <div key={i} className="bracket-pair">
                                            {renderKnockoutMatches(pair[0].match, pair[0].prediction, round.key)}
                                            {renderKnockoutMatches(pair[1].match, pair[1].prediction, round.key)}
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
