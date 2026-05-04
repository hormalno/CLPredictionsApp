import { BarChartIcon, TrophyIcon } from '../../../components/icons/Icons'
import './AdminSummaryCard.css'

type Props = {
    variant: 'activity' | 'accuracy' | 'points'
    label: string
    value: string | number
    meta?: string        // for activity variant
    progress?: number   // for accuracy variant (0-100)
}

const AdminSummaryCard = ({ variant, label, value, meta, progress }: Props) => {
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
        <div className="admin-summary-card">
            <div className="admin-summary-card-icon-wrapper">{showIcon()}</div>
            <div className="admin-summary-card-content">
                <span className="admin-summary-card-label">{label}</span>
                <h2 className="admin-summary-card-value">{value}</h2>
                {variant === 'points' && <p className="admin-summary-card-meta">{meta}</p>}
                {variant === 'activity' && <p className="admin-summary-card-meta">{meta}</p>}
                {variant === 'accuracy' && (
                    <div className="admin-summary-card-progress-bar">
                        <div className="admin-summary-card-progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminSummaryCard;