import './PredictionSummary.css';

const PredictionSummary = ({ children }: { children: React.ReactNode }) => {

    return (
        <section className="summary-section">
            <div className="summary-section-container">
                <div className="summary-section-grid">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default PredictionSummary;