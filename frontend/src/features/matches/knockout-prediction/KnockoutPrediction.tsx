
import type { Match } from '../../../types';
import { formatShortDate, formatTime } from '../../../utils/dateConfig';
import './KnockoutPrediction.css';

type Props = {
    match: Match;
    children : React.ReactNode;
};

const KnockoutPrediction = ({ match, children }: Props) => {
    const dateStr = formatShortDate(match.date);
    const timeStr = formatTime(match.date);

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
