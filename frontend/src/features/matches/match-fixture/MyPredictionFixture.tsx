import { CircleCheckIcon, ClockIcon, XSquareIcon } from '../../../components/icons/Icons';
import type { Match, Prediction } from '../../../types';
import MatchFixtureBase from './MatchFixtureBase';
import './MyPredictionFixture.css'

type Props = {
    match: Match;
    predictedOutcome: Prediction;
};

const MyPredictionFixture = ({ match, predictedOutcome }: Props) => {
    const outcomeClass = predictedOutcome.correct_outcome ? 'correct' : 'wrong';

    return (
        <MatchFixtureBase match={match}>
            <div className="match-status">
                <span className={`${outcomeClass} status-badge`}>
                    {predictedOutcome.correct_outcome
                        ? <CircleCheckIcon size={16} />
                        : <XSquareIcon size={16} />}
                    <span><text>{predictedOutcome.correct_outcome ? 'Correct result' : 'Wrong result'}</text></span>
                </span>
            </div>
            <div className="match-status">
                <span className="wrong status-badge">
                    <ClockIcon size={16} />
                    <span><text>Incorrect score</text></span>
                </span>
            </div>
            <div className="points-gained">
                <text>Points gained: +{predictedOutcome.points} pts</text>
            </div>
        </MatchFixtureBase>
    );
};

export default MyPredictionFixture;
