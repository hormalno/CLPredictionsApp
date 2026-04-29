import './UserScores.css'


const UserScores = () => (
    <div className="match-user-scores">
        <div className="user-scores">
            <div className="user-score-item">
                <span className="user-name">Alex</span>
                <span className="user-points">+10 pts</span>
            </div>
            <div className="user-score-item">
                <span className="user-name">Jordan</span>
                <span className="user-points">+3 pts</span>
            </div>
            <div className="your-score-item">
                <span className="user-name">You</span>
                <span className="user-points">+3 pts</span>
            </div>
        </div>
    </div>
);

export default UserScores;
