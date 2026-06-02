
import type { Match } from '../../../types';
import './KnockoutPrediction.css';

type Props = {
    match: Match;
    children : React.ReactNode;
};

const KnockoutPrediction = ({ match, children }: Props) => {
    const dateStr = new Date(match.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    const timeStr = new Date(match.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="knockout-predictions-match-card">
            <div>
                <div className="match-header">
                    <span>{dateStr} · {timeStr} · {match.location}</span>
                </div>
                <div className="match-teams">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default KnockoutPrediction;
