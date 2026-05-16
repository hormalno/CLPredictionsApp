import { Button } from '../../../components/button/Button';
import AdminSummaryCard from '../admin-summary-card/AdminSummaryCard';
import './AdminSummary.css';

const AdminSummary = () => {
    const finishedMatches = 30;
    const totalMatches = 104;
    const progress = (finishedMatches / totalMatches) * 100;

    const handleClosePredictions = () => {
        // Implement the logic to close all predictions here
        console.log('Close All Predictions button clicked');
    };

    return (
        <section className="admin-summary-section">
            <div className="admin-summary-section-container">
                <div className="admin-summary-section-grid">
                    <AdminSummaryCard 
                        variant="close" 
                        label="Close predictions" 
                        value={<Button variant='secondary' size='xl' onClick={handleClosePredictions}>Close All Predictions</Button>} 
                        meta="Once closed, users will no longer be able to make or edit predictions." 
                    />
                    <AdminSummaryCard 
                        variant="matches" 
                        label="Total matches" 
                        value={`${finishedMatches}/${totalMatches} Finished`} 
                        progress={progress} 
                    />
                </div>
            </div>
        </section>
    )
};

export default AdminSummary;
