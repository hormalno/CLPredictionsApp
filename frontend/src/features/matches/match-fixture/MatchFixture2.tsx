import { CalendarIcon, ClockIcon } from '../../../components/icons/Icons';
import './MatchFixture2.css';

const MatchFixture2 = () => {
    return (
        <div className="prediction-card">
                <div className="prediction-match-info">
                    <div className="prediction-date">
                        <CalendarIcon size={20} />
                        <span><text>Oct 24, 2026</text></span>
                    </div> 
                    <div className="prediction-date">
                        Mexico City ●Mexico City Stadium
                    </div>                 
                </div>
                <div className="prediction-details">
                  <div className="prediction-box">
                    <span className="box-footer"><text>Arsenal</text></span>
                  </div>
                  <div className="prediction-box">
                    <span className="box-footer"><text>Liverpool</text></span>
                  </div>
                </div>
                <div className="prediction-status">
                  <span className="pending status-badge">
                    <ClockIcon size={16} />
                    <span><text>Pending</text></span>
                  </span>
                </div>
              </div>
    );
}; 

export default MatchFixture2;