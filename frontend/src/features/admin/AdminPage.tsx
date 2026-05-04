import Navigation from '../../components/navigation/Navigation';
import Footer from '../../components/footer/Footer';
import AdminHeader from './admin-header/AdminHeader';
import AdminSection from './admin-section/AdminSection';

const AdminPage = () => {

    return (
        <>
            <Navigation />
            <AdminHeader />
            <button className="btn btn-secondary btn-sm">
                <span>Close Predictions</span>
            </button>
            <AdminSection />
            <Footer />
        </>
    );
};

export default AdminPage;
