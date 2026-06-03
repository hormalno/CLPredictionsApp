import useAuth from '../../auth/useAuth';
import type { MatchUserScore } from '../../../types';
import './KnockoutUserScores.css'

type Props = {
    scores: MatchUserScore[] | null;
}

const KnockoutUserScores = ({ scores }: Props) => {
    const { username } = useAuth();

    if (scores?.length === 0) return null;

    const topScores = username
        ? scores?.slice(0, 2)
        : scores?.slice(0, 3);

    const userScore = username
        ? scores?.find(s => s.username === username)
        : undefined;

    return (
        <div className="knockout-match-user-scores">
            <div className="user-scores">
                {/* <div className="user-score-item">
                    <span className="user-name">yasen</span>
                    <span className="user-points">+5 pts</span>
                </div>
                <div className="user-score-item">
                    <span className="user-name">yasen</span>
                    <span className="user-points">+5 pts</span>
                </div>
                <div className="your-score-item">
                    <span className="user-name">You</span>
                    <span className="user-points">+6 pts</span>
                </div> */}
                {/* {topScores?.map((score) => (
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
                )} */}
            </div>
        </div>
    )

};

export default KnockoutUserScores;