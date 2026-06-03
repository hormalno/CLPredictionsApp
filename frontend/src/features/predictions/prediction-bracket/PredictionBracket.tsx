import { useEffect, useRef, useState } from 'react';
import { getKnockoutMatches, getUserKnockoutPredictions, getTeams, getGroups } from '../../../api';
import KnockoutPrediction from '../../matches/knockout-prediction/KnockoutPrediction';
import type { KnockoutPrediction as KnockoutPredictionType, Match, Team, Group } from '../../../types';
import './PredictionBracket.css';
import FinalOutcome from '../../matches/knockout-prediction/FinalOutcome';
import PredictWinner from '../../matches/knockout-prediction/PredictWinner';
import TeamSelector from '../../matches/knockout-prediction/TeamSelector';

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

function filterTeamsForR32(match: Match, placeholder: string, allTeams: Team[], groups: Group[]): Team[] {
    const matchId = match.match_id;
    if (!matchId) return allTeams;

    if (/^1[A-L]$/.test(placeholder)) {
        const group = groups.find(g => g.next_p1 === matchId);
        if (!group) return allTeams;
        const ids = new Set(group.teams.map(t => t.id));
        return allTeams.filter(t => ids.has(t.id));
    }

    if (/^2[A-L]$/.test(placeholder)) {
        const group = groups.find(g => g.next_p2 === matchId);
        if (!group) return allTeams;
        const ids = new Set(group.teams.map(t => t.id));
        return allTeams.filter(t => ids.has(t.id));
    }

    if (placeholder.startsWith('3')) {
        const eligible = groups.filter(g => g.next_p3 === matchId);
        const ids = new Set(eligible.flatMap(g => g.teams.map(t => t.id)));
        return ids.size ? allTeams.filter(t => ids.has(t.id)) : allTeams;
    }

    return allTeams;
}

const PredictionBracket = () => {
    const [matchesByRound, setMatchesByRound] = useState<Record<string, MatchWithPrediction[]>>({});
    const [teams, setTeams] = useState<Team[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
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
            setGroups(groups);
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

    const renderKnockoutMatches = (match : Match, prediction : KnockoutPredictionType | undefined, round : string) => (
        <div className="match-slot">
            <KnockoutPrediction match={match} >
                {match.is_closed
                ?  <FinalOutcome match={match} prediction={prediction} />
                :  round === 'R32' 
                    ?    (<TeamSelector
                            match={match}
                            prediction={prediction}
                            homeTeams={filterTeamsForR32(match, match.home_placeholder, teams, groups)}
                            awayTeams={filterTeamsForR32(match, match.away_placeholder, teams, groups)}
                            usedTeamIds={r32UsedTeamIds}
                            onSaved={refreshPredictions}
                        />)
                    : <PredictWinner match={match} prediction={prediction} onSaved={refreshPredictions} />}
            </KnockoutPrediction>
        </div>
    )

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
                                {round.key === 'F' // Final
                                ? 
                                    items.map(({ match, prediction }) => renderKnockoutMatches(match, prediction, round.key))
                                : // Other rounds
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
