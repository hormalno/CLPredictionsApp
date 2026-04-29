import { closePredictions } from '../../api/predictions';
import Navigation from '../../components/navigation/Navigation';
import Footer from '../../components/footer/Footer';

const AdminPage = () => {
    const handleClosePredictions = async () => {
        if (!confirm('Close all predictions? This cannot be undone.')) return
        try {
            await closePredictions()
            alert('All predictions have been closed.')
        } catch {
            alert('Failed to close predictions.')
        }
    };

    return (
        <>
            <Navigation />
            <div>
                <button onClick={handleClosePredictions} className="btn btn-secondary btn-sm">
                    <span>Close Predictions</span>
                </button>
            </div>
            <Footer />
        </>
    );
};

export default AdminPage;
