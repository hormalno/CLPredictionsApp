import type { ReactNode } from 'react';
import './AdminHeader.css';

type Props = {
    children?: ReactNode;
}

const AdminHeader = ({ children }: Props) => {
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
                {children}
            </div>
        </section>
    );
};

export default AdminHeader;