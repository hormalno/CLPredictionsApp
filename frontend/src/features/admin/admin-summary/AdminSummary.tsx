import { useEffect, useState } from 'react';
import { getMatches } from '../../../api';
import { Button } from '../../../components/button/Button';
import AdminSummaryCard from '../admin-summary-card/AdminSummaryCard';
import './AdminSummary.css';

const AdminSummary = () => {
    const [totalMatches, setTotalMatches] = useState(0);
    const [finishedMatches, setFinishedMatches] = useState(0);
    const progress = totalMatches > 0 ? (finishedMatches / totalMatches) * 100 : 0;

    useEffect(() => {
        getMatches().then(matches => {
            setTotalMatches(matches.length);
            setFinishedMatches(matches.filter(m => m.is_finished).length);
        });
    }, []);

    const handleClosePredictions = () => {
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
