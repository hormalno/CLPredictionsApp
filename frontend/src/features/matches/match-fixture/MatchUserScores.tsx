import useAuth from '../../auth/useAuth';
import type { MatchUserScore } from '../../../types';
import './MatchUserScores.css';

type Props = {
    scores: MatchUserScore[];
}

const UserScores = ({ scores }: Props) => {
    const { username } = useAuth();

    if (scores.length === 0) return null;

    const topScores = username
        ? scores.slice(0, 2)
        : scores.slice(0, 3);

    const userScore = username
        ? scores.find(s => s.username === username)
        : undefined;

    return (
        <div className="match-user-scores">
            <div className="user-scores">
                {topScores.map((score) => (
                    <div key={score.username} className="user-score-item">
                        <span className="user-name">{score.username}</span>
                        <span className="user-points">+{score.points} pts</span>
                    </div>
                ))}
                {userScore && (
                    <div className="your-score-item">
                        <span className="user-name">You</span>
                        <span className="user-points">+{userScore.points} pts</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserScores;
