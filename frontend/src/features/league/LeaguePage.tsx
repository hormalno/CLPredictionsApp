import { useState } from 'react';
import Navigation from '../../components/navigation/Navigation';
import Footer from '../../components/footer/Footer';
import Fixtures from './fixtures/Fixtures';
import Groups from './groups/Groups';
import Knockout from './knockout/Knockout';
import './LeaguePage.css';


type Tab = 'fixtures' | 'group' | 'knockout';

const LeaguePage = () => {
    const [activeTab, setActiveTab] = useState<Tab>('fixtures');

    return (
        <>
          <Navigation />
          <div>
          <div className="league-tabs-container1">
            <section className="league-tabs-section">
              <div className="league-tabs-container">
                <div className="league-tabs-header">
                  <h2 className="section-title">Tournament Progress</h2>
                  <p className="section-subtitle">
                      Stay updated with MatchMates league standings and upcoming
                      matches.
                  </p>
                </div>
                <div className="league-tabs-nav-wrapper">
                  <div role="tablist" className="league-tabs-nav">
                    <button
                      id="tab-fixtures"
                      role="tab"
                      aria-controls="panel-fixtures"
                      aria-selected={activeTab === 'fixtures'}
                      className={`league-tabs-btn${activeTab === 'fixtures' ? ' active' : ''}`}
                      onClick={() => setActiveTab('fixtures')}
                    >
                      Fixtures &amp; Results
                    </button>
                    <button
                      id="tab-group"
                      role="tab"
                      aria-controls="panel-group"
                      aria-selected={activeTab === 'group'}
                      className={`league-tabs-btn${activeTab === 'group' ? ' active' : ''}`}
                      onClick={() => setActiveTab('group')}
                    >
                      Group Standings
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
                <div className="league-tabs-content">
                  <div
                    id="panel-fixtures"
                    role="tabpanel"
                    aria-labelledby="tab-fixtures"
                    className={`league-tabs-panel${activeTab === 'fixtures' ? ' active' : ''}`}
                    hidden={activeTab !== 'fixtures'}
                  >
                    <div className="league-tabs-grid">
                      <Fixtures />
                    </div>
                  </div>
                  <div
                    id="panel-group"
                    role="tabpanel"
                    aria-labelledby="tab-group"
                    className={`league-tabs-panel${activeTab === 'group' ? ' active' : ''}`}
                    hidden={activeTab !== 'group'}
                  >
                    <div className="league-tabs-grid">
                      <Groups />
                    </div>
                  </div>
                  <div
                    id="panel-knockout"
                    role="tabpanel"
                    aria-labelledby="tab-knockout"
                    className={`league-tabs-panel${activeTab === 'knockout' ? ' active' : ''}`}
                    hidden={activeTab !== 'knockout'}
                  >
                    <div className="league-tabs-grid">
                      <Knockout />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </>
    );
};

export default LeaguePage;
