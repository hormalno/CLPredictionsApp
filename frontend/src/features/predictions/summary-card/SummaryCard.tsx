import { BarChartIcon, TrophyIcon } from '../../../components/icons/Icons'
import './SummaryCard.css'

type Props = {
    variant: 'activity' | 'accuracy' | 'points'
    label: string
    value: string | number
    meta?: string        // for activity variant
    progress?: number   // for accuracy variant (0-100)
}

const SummaryCard = ({ variant, label, value, meta, progress }: Props) => {
    const showIcon = () => {
        if (variant === 'points') {
            return (<TrophyIcon size={24} />);
        }

        if (variant === 'accuracy') {
            return (<TrophyIcon size={24} />);
        }

        return (<BarChartIcon size={24} />);
    };

    return (
        <div className="summary-card">
            <div className="summary-card-icon-wrapper">{showIcon()}</div>
            <div className="summary-card-content">
                <span className="summary-card-label">{label}</span>
                <h2 className="summary-card-value">{value}</h2>
                {variant === 'points' && <p className="summary-card-meta">{meta}</p>}
                {variant === 'activity' && <p className="summary-card-meta">{meta}</p>}
                {variant === 'accuracy' && (
                    <div className="summary-card-progress-bar">
                        <div className="summary-card-progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                )}
            </div>
        </div>
    );
}
    

export default SummaryCard;
