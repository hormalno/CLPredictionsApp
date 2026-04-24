import { CircleCheckIcon, ClockIcon } from '../../../components/icons/Icons';
import type { Match } from '../../../types';
import MatchFixture from './MatchFixtureBase';

type Props = {
    match: Match;
};

const MyPredictionFixture = ({ match }: Props) => {
    const result = ["Correct result", "Wrong result"];
    const score = ["Perfect score", "One team correct", "Incorrect score"];

    return (
        <MatchFixture match={match}>
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
        </MatchFixture>
    );
};

export default MyPredictionFixture;
