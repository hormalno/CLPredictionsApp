import { useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";
import PredictionHeader from "./prediction-header/PredictionHeader";
import PredictionSummary from "./prediction-summary/PredictionSummary";
import PredictionSection from "./predictions-section/PredictionSection";
import PredictionBracket from "./prediction-bracket/PredictionBracket";
import PredictGoalscorer from "./prediction-goalscorer/PredictGoalscorer";
import PredictionGroupStandings from "./prediction-group-standings/PredictionGroupStandings";
import './PredictionPage.css';
import PredictTeamGoals from "./prediction-goalscorer/PredictTeamGoals";

type Tab = 'fixtures' | 'group' | 'knockout' | 'goalscorer';

const PredictionPage = () => {
    const [activeTab, setActiveTab] = useState<Tab>('fixtures');

    const handleTabClick = (tab: Tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <Navigation />
            <PredictionHeader>
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
                    Group Fixtures
                  </button>
                  <button
                    id="tab-group"
                    role="tab"
                    aria-controls="panel-group"
                    aria-selected={activeTab === 'group'}
                    className={`league-tabs-btn${activeTab === 'group' ? ' active' : ''}`}
                    onClick={() => handleTabClick('group')}
                  >
                    Group Winners
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
                  <button
                    id="tab-goalscorer"
                    role="tab"
                    aria-controls="panel-goalscorer"
                    aria-selected={activeTab === 'goalscorer'}
                    className={`league-tabs-btn${activeTab === 'goalscorer' ? ' active' : ''}`}
                    onClick={() => handleTabClick('goalscorer')}
                  >
                    Goalscorer
                  </button>
                </div>
              </div>
            </PredictionHeader>
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
                    <PredictionSummary summary_type="match" />
                    <PredictionSection />
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
                    <PredictionSummary summary_type="group" />
                    <PredictionGroupStandings />
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
                    <PredictionSummary summary_type="knockout" />
                    <PredictionBracket />
                  </div>
                </div>
                <div
                  id="panel-goalscorer"
                  role="tabpanel"
                  aria-labelledby="tab-goalscorer"
                  className={`league-tabs-panel${activeTab === 'goalscorer' ? ' active' : ''}`}
                  hidden={activeTab !== 'goalscorer'}
                >
                  <div className="league-tabs-grid" style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <PredictGoalscorer />
                    <PredictTeamGoals />
                  </div>
                </div>
              </div>
            </section>
            <Footer />
        </>
    );
};

export default PredictionPage;
