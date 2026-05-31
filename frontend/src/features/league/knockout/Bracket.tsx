import { useEffect, useRef, useState } from 'react';
import { getKnockoutMatches } from '../../../api/matches';
import KnockoutMatch from '../../matches/knockout-match/KnockoutMatch';
import type { Match } from '../../../types';
import './Bracket.css'

const ROUNDS = [
    { key: 'PO',  label: 'Play-off' },
    { key: 'R32', label: 'Round of 32' },
    { key: 'R16', label: 'Round of 16' },
    { key: 'QF',  label: 'Quarterfinal' },
    { key: 'SF',  label: 'Semifinal' },
    { key: 'F',   label: 'Final' },
];

const WINDOW = 3;

const Knockout = () => {
    const [matchesByRound, setMatchesByRound] = useState<Record<string, Match[]>>({});
    const [offset, setOffset] = useState(0);
    const [dir, setDir] = useState<'forward' | 'backward'>('forward');
    const sectionRef = useRef<HTMLElement>(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        getKnockoutMatches().then(matches => {
            const grouped = matches.reduce<Record<string, Match[]>>((acc, m) => {
                (acc[m.round] ??= []).push(m);
                return acc;
            }, {});
            setMatchesByRound(grouped);
        });
    }, []);

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
        <section ref={sectionRef} id="bracket-section" className="tournament-bracket">
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
                    const matches = matchesByRound[round.key] ?? [];
                    return (
                        <div
                            key={round.key}
                            data-round={matches.length}
                            className={`bracket-round${idx === visibleRounds.length - 1 ? ' bracket-round--last' : ''}`}
                        >
                            <div className="bracket-matches">
                                {round.key === 'F'
                                    ? matches.map(m => <KnockoutMatch key={m.id} match={m} />)
                                    : matches.reduce<Match[][]>((pairs, m, i) => {
                                        if (i % 2 === 0) pairs.push([m]);
                                        else pairs[pairs.length - 1].push(m);
                                        return pairs;
                                    }, []).map((pair, i) => (
                                        <div key={i} className="bracket-pair">
                                            <div className="match-slot"><KnockoutMatch match={pair[0]} /></div>
                                            {pair[1] && <div className="match-slot"><KnockoutMatch match={pair[1]} /></div>}
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
