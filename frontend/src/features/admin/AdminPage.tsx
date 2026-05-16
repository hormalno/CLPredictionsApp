import Navigation from '../../components/navigation/Navigation';
import Footer from '../../components/footer/Footer';
import AdminHeader from './admin-header/AdminHeader';
import AdminSection from './admin-section/AdminSection';
import AdminSummary from './admin-summary/AdminSummary';

const AdminPage = () => {

    return (
        <>
            <Navigation />
            <AdminHeader />
            <AdminSummary />
            <AdminSection />
            <Footer />
        </>
    );
};

export default AdminPage;
