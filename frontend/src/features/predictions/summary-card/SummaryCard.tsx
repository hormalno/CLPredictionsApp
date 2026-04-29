import { BarChartIcon, TrophyIcon } from '../../../components/icons/Icons'
import './SummaryCard.css'

type Props = {
    variant: 'activity' | 'accuracy'
    icon: string
    label: string
    value: string | number
    meta?: string        // for activity variant
    progress?: number   // for accuracy variant (0-100)
}

const SummaryCard = ({ variant, icon, label, value, meta, progress }: Props) => (
    <div className={`summary-card ${variant === 'accuracy' ? 'accent' : ''}`}>
        <div className="summary-card-icon-wrapper">{icon == 'barChart' ? (<BarChartIcon size={24} />) : <TrophyIcon size={24} />}</div>
        <div className="summary-card-content">
            <span className="summary-card-label">{label}</span>
            <h2 className="summary-card-value">{value}</h2>
            {variant === 'activity' && <p className="summary-card-meta">{meta}</p>}
            {variant === 'accuracy' && (
                <div className="summary-card-progress-bar">
                    <div className="summary-card-progress-fill" style={{ width: `${progress}%` }} />
                </div>
            )}
        </div>
    </div>
);

export default SummaryCard;
