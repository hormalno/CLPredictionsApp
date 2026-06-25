import { useEffect, useRef, useState } from "react";
import { FilterIcon, ChevronDownIcon } from "../icons/Icons";
import './MatchFilter.css';

export type FixtureFilter = 'upcoming' | 'finished' | 'all';

export const FILTER_OPTIONS: { value: FixtureFilter; label: string }[] = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'finished', label: 'Finished' },
    { value: 'all', label: 'All' },
];

export const filterMatches = <T extends { is_finished: boolean }>(
    matches: T[],
    filter: FixtureFilter,
    isFinished: (m: T) => boolean = m => m.is_finished,
): T[] =>
    matches.filter(m => {
        if (filter === 'all') return true;
        const finished = isFinished(m);
        return filter === 'finished' ? finished : !finished;
    });

type Props = {
    value: FixtureFilter;
    onChange: (value: FixtureFilter) => void;
};

const MatchFilter = ({ value, onChange }: Props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!menuOpen) return;
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [menuOpen]);

    return (
        <div className="match-filter-toolbar">
            <div className="match-filter" role="group" aria-label="Filter matches">
                {FILTER_OPTIONS.map(opt => (
                    <button
                        key={opt.value}
                        type="button"
                        className={`match-filter-btn ${value === opt.value ? 'is-active' : ''}`}
                        aria-pressed={value === opt.value}
                        onClick={() => onChange(opt.value)}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
            <div className="match-filter-mobile" ref={menuRef}>
                <button
                    type="button"
                    className="match-filter-toggle"
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                    aria-label="Filter matches"
                    onClick={() => setMenuOpen(o => !o)}
                >
                    <FilterIcon size={18} />
                    <span>{FILTER_OPTIONS.find(o => o.value === value)?.label}</span>
                    <ChevronDownIcon size={16} className={menuOpen ? 'is-open' : ''} />
                </button>
                {menuOpen && (
                    <div className="match-filter-menu" role="menu">
                        {FILTER_OPTIONS.map(opt => (
                            <button
                                key={opt.value}
                                type="button"
                                role="menuitemradio"
                                aria-checked={value === opt.value}
                                className={`match-filter-menu-item ${value === opt.value ? 'is-active' : ''}`}
                                onClick={() => { onChange(opt.value); setMenuOpen(false); }}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MatchFilter;
