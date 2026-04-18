import { useNavigate } from 'react-router-dom';
import { CalendarIcon, ClockIcon, CircleCheckIcon } from '../../../components/icons/Icons';
import './MatchFixture.css';

type props = {
    my_predict: boolean;
};

const MatchFixture = ({ my_predict }: props) => {
    const navigate = useNavigate();
    const result = ["Correct result", "Wrong result"];
    const score = ["Perfect score", "One team correct", "Incorrect score"];    

    return (        
        <div>
            <div className="match-item">
                <div className="match-info">
                    <div className="match-info-date-row">
                        <span className='match-info-date'>
                            <CalendarIcon size={20} />
                        </span>
                        <span><text>Oct 24, 2026</text></span>
                    </div>
                    <div><text>Mexico City Stadium</text></div>
                    <div><text>Mexico City</text></div>
                </div>
                <div className="match-scoreline-wrapper">
                    <div className='match-round'>
                        Round 1 <span className="match-round-dot">·</span> Group A
                    </div>
                    <div className="match-scoreline">
                        <span className="team-home"><text>Liverpool</text></span>
                        <div className="score-result" onClick={() => navigate('/fixtures')}>
                            <button className="score-button">1</button>
                            <span className="score-separator"><text>:</text></span>
                            <button className="score-button">2</button>
                        </div>
                        <span className="team-away"><text>Manchester United</text></span>
                    </div>                 
                </div>
                <div className="match-actions">                    
                    {my_predict ? (
                    <div className="match-friends-scores">
                        <div className="match-status">
                            <span className="correct status-badge">
                                <CircleCheckIcon size={16} />
                                <span><text>{result[0]}</text></span>
                            </span>
                        </div>
                        <div className="match-status">
                            <span className="wrong status-badge">
                                <ClockIcon size={16} />
                                <span><text>{score[2]}</text></span>
                            </span>
                        </div>
                        <div className="points-gained">
                            <text>Points gained: +3 pts</text>
                        </div>
                    </div>) :  (                
                    <div className="match-friends-scores">
                        <div className="friend-scores">
                            <div className="friend-score-item">
                                <span className="friend-name">Alex</span>
                                <span className="friend-points">+10 pts</span>
                            </div>
                            <div className="friend-score-item">
                                <span className="friend-name">Jordan</span>
                                <span className="friend-points">+3 pts</span>
                            </div>  
                            <div className="your-score-item">
                                <span className="friend-name">You</span>
                                <span className="friend-points">+3 pts</span>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default MatchFixture;