import './AdminHeader.css';

const AdminHeader = () => {
    return (
        <section className="header-section">
            <div className="header-section-container">
                <div className="header-section-card">
                <h1 className="my-predictions-hero-title hero-title">
                    <text>Admin Site</text>
                </h1>
                <p className="hero-subtitle">
                    <text>
                    Fixtures management, user management and more. Admin sites are the control center for MatchMates, where you can manage all aspects of the application.
                    </text>
                </p>
                </div>
            </div>
        </section>
    );
};

export default AdminHeader;