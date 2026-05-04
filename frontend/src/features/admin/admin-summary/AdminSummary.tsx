import AdminSummaryCard from '../admin-summary-card/AdminSummaryCard';
import './AdminSummary.css';

const AdminSummary = () => {
    return (
        <section className="admin-summary-section">
            <div className="admin-summary-section-container">
                <div className="admin-summary-section-grid">
                    <AdminSummaryCard variant="activity" label="Total Predictions" value={predictedMatches} meta="All-time activity" />
                    <AdminSummaryCard variant="points" label="Total Points" value={points} meta="Current points gained" />
                </div>
            </div>
        </section>
    )
};

export default AdminSummary;
