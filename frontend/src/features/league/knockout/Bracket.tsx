import { useEffect, useRef, useState } from 'react';
import { getKnockoutMatches } from '../../../api/matches';
import KnockoutMatch from '../../matches/knockout-match/KnockoutMatch';
import type { Match } from '../../../types';
import { ROUND_MATCH_ORDER } from '../../matches/knockoutMatchOrder';
import './Bracket.css'

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

const Knockout = () => {
    const [matchesByRound, setMatchesByRound] = useState<Record<string, Match[]>>({});
    const [offset, setOffset] = useState(0);
    const [dir, setDir] = useState<'forward' | 'backward'>('forward');
    const [windowSize, setWindowSize] = useState(() =>
        typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT ? MOBILE_WINDOW : DESKTOP_WINDOW
    );
    const sectionRef = useRef<HTMLElement>(null);
    const userNavigated = useRef(false);

    useEffect(() => {
        getKnockoutMatches().then(matches => {
            const grouped = matches.reduce<Record<string, Match[]>>((acc, m) => {
                (acc[m.round] ??= []).push(m);
                return acc;
            }, {});
            setMatchesByRound(grouped);

            // Start on the first round that still has pending matches (leftmost).
            // If every round is finished, land on the last round.
            const active = ROUNDS.filter(r => grouped[r.key]?.length);
            const firstPending = active.findIndex(r => grouped[r.key].some(m => !m.is_finished));
            const targetIdx = firstPending === -1 ? active.length - 1 : firstPending;
            const ws = window.innerWidth <= MOBILE_BREAKPOINT ? MOBILE_WINDOW : DESKTOP_WINDOW;
            const maxOffset = Math.max(0, active.length - ws);
            setOffset(Math.min(Math.max(0, targetIdx), maxOffset));
        });
    }, []);

    useEffect(() => {
        const onResize = () => setWindowSize(window.innerWidth <= MOBILE_BREAKPOINT ? MOBILE_WINDOW : DESKTOP_WINDOW);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

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

    return (
        <section ref={sectionRef} id="bracket-section" className="tournament-bracket tournament-bracket--paged">
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

            <div key={offset} className={`tournament-bracket-grid bracket-enter-${dir}`}>
                <div className="bracket-spacer" />
                {visibleRounds.map((round, idx) => {
                    const rawMatches = matchesByRound[round.key] ?? [];
                    const order = ROUND_MATCH_ORDER[round.key] ?? [];
                    const matches: Match[] = order.length
                        ? [...rawMatches].sort((a, b) => {
                            const ai = order.indexOf(a.match_id ?? -1);
                            const bi = order.indexOf(b.match_id ?? -1);
                            return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
                          })
                        : rawMatches;
                    return (
                        <div
                            key={round.key}
                            data-round={matches.length}
                            className={`bracket-round${idx === visibleRounds.length - 1 ? ' bracket-round--last' : ''}`}
                        >
                            <div className="bracket-matches">
                                {round.key === 'F'
                                    ? (
                                        <>
                                            {matches.map(m => <KnockoutMatch key={m.id} match={m} />)}
                                            {(matchesByRound['3P'] ?? []).length > 0 && (
                                                <div className="third-place-section">
                                                    <span className="third-place-label">3rd Place</span>
                                                    <div className="third-place-match-wrapper">
                                                        {(matchesByRound['3P'] ?? []).map(m => <KnockoutMatch key={m.id} match={m} />)}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )
                                    : matches.reduce<Match[][]>((pairs, m, i) => {
                                        if (i % 2 === 0) pairs.push([m]);
                                        else pairs[pairs.length - 1].push(m);
                                        return pairs;
                                    }, []).map((pair, i) => (
                                        <div key={i} className="bracket-pair">
                                            <div className="match-slot">
                                                <KnockoutMatch match={pair[0]} />
                                            </div>
                                            {pair[1] && 
                                                <div className="match-slot">
                                                    <KnockoutMatch match={pair[1]} />
                                                </div>}
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

export default Knockout;
