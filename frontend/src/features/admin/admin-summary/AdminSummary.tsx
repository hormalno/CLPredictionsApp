import { useEffect, useState } from 'react';
import { getMatches } from '../../../api';
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

    return (
        <section className="admin-summary-section">
            <div className="admin-summary-section-container">
                <div className="admin-summary-section-grid">
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
