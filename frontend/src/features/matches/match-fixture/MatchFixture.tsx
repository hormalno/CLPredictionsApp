import type { Match } from '../../../types';
import MatchFixtureBase from './MatchFixtureBase';

type Props = {
    match: Match;
};

const MatchFixture = ({ match }: Props) => (
    <MatchFixtureBase match={match}>
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
    </MatchFixtureBase>
);

export default MatchFixture;
