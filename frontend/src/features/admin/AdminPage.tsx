import { useState } from 'react';
import Navigation from '../../components/navigation/Navigation';
import Footer from '../../components/footer/Footer';
import AdminSection from './admin-section/AdminSection';
import AdminSummary from './admin-summary/AdminSummary';
import AdminBracket from './admin-knockout/AdminBracket';


type Tab = 'group' | 'knockout';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState<Tab>('group');

    return (
        <>
            <Navigation />
            <section className="league-tabs-section-header">
              <div className="league-tabs-header">
                <h2 className="section-title">Admin Site</h2>
                <p className="section-subtitle">
                  Enter the matches results.
                </p>
              </div>
                <div className="league-tabs-nav-wrapper">
                    <div role="tablist" className="league-tabs-nav">
                        <button
                            id="tab-group"
                            role="tab"
                            aria-controls="panel-group"
                            aria-selected={activeTab === 'group'}
                            className={`league-tabs-btn${activeTab === 'group' ? ' active' : ''}`}
                            onClick={() => setActiveTab('group')}
                        >
                            Group Stage
                        </button>
                        <button
                            id="tab-knockout"
                            role="tab"
                            aria-controls="panel-knockout"
                            aria-selected={activeTab === 'knockout'}
                            className={`league-tabs-btn${activeTab === 'knockout' ? ' active' : ''}`}
                            onClick={() => setActiveTab('knockout')}
                        >
                            Knockout Phase
                        </button>
                    </div>
                </div>
            </section>
            <AdminSummary />
            <section className="league-tabs-section">
                <div className="league-tabs-content">
                    <div
                        id="panel-group"
                        role="tabpanel"
                        aria-labelledby="tab-group"
                        className={`league-tabs-panel${activeTab === 'group' ? ' active' : ''}`}
                        hidden={activeTab !== 'group'}
                    >
                        <AdminSection />
                    </div>
                    <div
                        id="panel-knockout"
                        role="tabpanel"
                        aria-labelledby="tab-knockout"
                        className={`league-tabs-panel${activeTab === 'knockout' ? ' active' : ''}`}
                        hidden={activeTab !== 'knockout'}
                    >
                        <AdminBracket />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default AdminPage;
