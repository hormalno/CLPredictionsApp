import './MatchFixture2.css';

const MatchFixture2 = () => {
    return (
        <div className="prediction-card">
                <div className="prediction-match-info">
                    <div className="prediction-date">
                        <svg
                        fill="none"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        >
                        <rect
                            x="3"
                            y="4"
                            rx="2"
                            ry="2"
                            width="18"
                            height="18"
                        ></rect>
                        <line x1="16" x2="16" y1="2" y2="6"></line>
                        <line x1="8" x2="8" y1="2" y2="6"></line>
                        <line x1="3" x2="21" y1="10" y2="10"></line>
                        </svg>
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
                    <svg
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m9 0l3 2m-3-7v5"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    <span><text>Pending</text></span>
                  </span>
                </div>
              </div>
    );
}; 

export default MatchFixture2;