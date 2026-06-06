import { useState } from 'react';
import KnockoutTeam from '../../teams/knockout-team/KnockoutTeam';
import type { Match } from '../../../types';
import { formatShortDate, formatTime } from '../../../utils/dateConfig';
import { submitMatch } from '../../../api/admin';
import { Button } from '../../../components/button/Button';
import { SaveIcon, CheckCircleIcon } from '../../../components/icons/Icons';
import './AdminKnockoutMatch.css';

type Props = {
    match: Match;
};

const ScoreInput = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={2}
        placeholder="-"
        className="input ako-score-input"
        value={value}
        onChange={e => onChange(e.target.value.replace(/\D/g, ''))}
    />
);

const AdminKnockoutMatch = ({ match }: Props) => {
    const dateStr = formatShortDate(match.date);
    const timeStr = formatTime(match.date);

    const [homeScore, setHomeScore] = useState<string>(match.score_home_team?.toString() ?? '');
    const [awayScore, setAwayScore] = useState<string>(match.score_away_team?.toString() ?? '');
    const [homePen, setHomePen] = useState<string>(match.home_penalties?.toString() ?? '');
    const [awayPen, setAwayPen] = useState<string>(match.away_penalties?.toString() ?? '');
    const [isFinished, setIsFinished] = useState(match.is_finished);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isDraw = homeScore !== '' && awayScore !== '' && homeScore === awayScore;

    const handleSave = async () => {
        const home = parseInt(homeScore);
        const away = parseInt(awayScore);
        if (isNaN(home) || isNaN(away)) { setError('Enter valid scores'); return; }
        if (isDraw) {
            const hp = parseInt(homePen);
            const ap = parseInt(awayPen);
            if (isNaN(hp) || isNaN(ap)) { setError('Draw — enter penalty scores'); return; }
            if (hp === ap) { setError('Penalty scores must have a winner'); return; }
        }
        setSaving(true);
        setError(null);
        try {
            const hp = homePen !== '' ? parseInt(homePen) : undefined;
            const ap = awayPen !== '' ? parseInt(awayPen) : undefined;
            await submitMatch(match.id, home, away, hp, ap);
            setIsFinished(true);
            setSaved(true);
            setTimeout(() => setSaved(false), 1500);
        } catch (e) {
            const msg = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
            setError(msg ?? 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="admin-knockout-match-card">
            <div className="admin-knockout-match-header">
                <span>{dateStr} · {timeStr} · {match.location}</span>
                <span className="knockout-match-code">M{match.match_id}</span>
            </div>

            <div className="admin-knockout-match-body">
                <div className="ako-team-row">
                    <KnockoutTeam team={match.home_team ?? null} placeholder={match.home_placeholder} />
                    <div className="ako-inputs">
                        <ScoreInput value={homeScore} onChange={setHomeScore} />
                        {isDraw && <ScoreInput value={homePen} onChange={setHomePen} />}
                    </div>
                </div>

                <div className="ako-team-row">
                    <KnockoutTeam team={match.away_team ?? null} placeholder={match.away_placeholder} />
                    <div className="ako-inputs">
                        <ScoreInput value={awayScore} onChange={setAwayScore} />
                        {isDraw && <ScoreInput value={awayPen} onChange={setAwayPen} />}
                    </div>
                </div>

                <div className="ako-footer">
                    {error && <span className="ako-error">{error}</span>}
                    {isFinished
                        ? <Button variant="outline" size="sm" disabled><CheckCircleIcon size={16} /></Button>
                        : <Button variant="outline" size="sm" onClick={handleSave} disabled={saving || saved}>
                            {saving ? 'Saving…' : <SaveIcon size={16} />}
                          </Button>
                    }
                </div>
            </div>
        </div>
    );
};

export default AdminKnockoutMatch;
