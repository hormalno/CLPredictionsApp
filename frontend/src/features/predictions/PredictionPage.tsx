import { useEffect, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";
import PredictionHeader from "./prediction-header/PredictionHeader";
import PredictionSummary from "./prediction-summary/PredictionSummary";
import PredictionSection from "./predictions-section/PredictionSection";
import { getUserMatchPredictions } from "../../api";
import type { MatchPrediction } from "../../types";
import './PredictionPage.css';

type Tab = 'group' | 'knockout';

const PredictionPage = () => {
    const [predictions, setPredictions] = useState<MatchPrediction[]>([]);
    const [activeTab, setActiveTab] = useState<Tab>('group');

    const handleTabClick = (tab: Tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        getUserMatchPredictions().then(setPredictions).catch(() => {});
    }, []);

    return (
        <>
            <Navigation />            
            <PredictionHeader>
              <div className="league-tabs-nav-wrapper">                
                <div role="tablist" className="league-tabs-nav">
                  <button
                    id="tab-group"
                    role="tab"
                    aria-controls="panel-group"
                    aria-selected={activeTab === 'group'}
                    className={`league-tabs-btn${activeTab === 'group' ? ' active' : ''}`}
                    onClick={() => handleTabClick('group')}
                  >
                    Group Stage Phase
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
            </PredictionHeader>
            <section className="league-tabs-section">
              <div className="league-tabs-content">                
                <div
                  id="panel-group"
                  role="tabpanel"
                  aria-labelledby="tab-group"
                  className={`league-tabs-panel${activeTab === 'group' ? ' active' : ''}`}
                  hidden={activeTab !== 'group'}
                >
                  <div className="league-tabs-grid">
                    <PredictionSummary predictions={predictions} />
                    <PredictionSection predictions={predictions} setPredictions={setPredictions} />
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
                    {/* <Knockout key={refreshKeys.knockout} /> */}
                  </div>
                </div>
              </div>
            </section>            
            <Footer />
        </>
    );
};

export default PredictionPage;
