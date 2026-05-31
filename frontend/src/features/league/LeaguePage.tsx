import { useState } from 'react';
import Navigation from '../../components/navigation/Navigation';
import Footer from '../../components/footer/Footer';
import Fixtures from './fixtures/Fixtures';
import Groups from './groups/Groups';
import Bracket from './knockout/Bracket';
import './LeaguePage.css';


type Tab = 'fixtures' | 'group' | 'knockout';

const LeaguePage = () => {
    const [activeTab, setActiveTab] = useState<Tab>('fixtures');
    const [refreshKeys, setRefreshKeys] = useState<Record<Tab, number>>({ fixtures: 0, group: 0, knockout: 0 });

    const handleTabClick = (tab: Tab) => {
        setActiveTab(tab);
        setRefreshKeys(prev => ({ ...prev, [tab]: prev[tab] + 1 }));
    };

    return (
        <>
          <Navigation />            
          <div className="">
            <section className="league-tabs-section-header">
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
                    onClick={() => handleTabClick('fixtures')}
                  >
                    Fixtures &amp; Results
                  </button>
                  <button
                    id="tab-group"
                    role="tab"
                    aria-controls="panel-group"
                    aria-selected={activeTab === 'group'}
                    className={`league-tabs-btn${activeTab === 'group' ? ' active' : ''}`}
                    onClick={() => handleTabClick('group')}
                  >
                    Group Standings
                  </button>
                  <button
                    id="tab-knockout"
                    role="tab"
                    aria-controls="panel-knockout"
                    aria-selected={activeTab === 'knockout'}
                    className={`league-tabs-btn${activeTab === 'knockout' ? ' active' : ''}`}
                    onClick={() => handleTabClick('knockout')}
                  >
                    Knockout Phase
                  </button>
                </div>
              </div>
            </section>
            <section className="league-tabs-section">
              <div className="league-tabs-content">
                <div
                  id="panel-fixtures"
                  role="tabpanel"
                  aria-labelledby="tab-fixtures"
                  className={`league-tabs-panel${activeTab === 'fixtures' ? ' active' : ''}`}
                  hidden={activeTab !== 'fixtures'}
                >
                  <div className="league-tabs-grid">
                    <Fixtures key={refreshKeys.fixtures} />
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
                    <Groups key={refreshKeys.group} />
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
                    <Bracket key={refreshKeys.knockout} />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </>
    );
};

export default LeaguePage;
