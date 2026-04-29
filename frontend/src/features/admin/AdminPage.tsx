import Navigation from '../../components/navigation/Navigation';
import Footer from '../../components/footer/Footer';

const AdminPage = () => {

    return (
        <>
            <Navigation />
            <div>
                <button className="btn btn-secondary btn-sm">
                    <span>Close Predictions</span>
                </button>
            </div>
            <Footer />
        </>
    );
};

export default AdminPage;
