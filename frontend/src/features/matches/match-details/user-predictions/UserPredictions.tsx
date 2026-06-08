import PredictionCard from '../../../predictions/prediction-card/PredictionCard';
import KnockoutPredictionCard from '../../../predictions/knockout-prediction-card/KnockoutPredictionCard';
import type { MatchUserPrediction, KnockoutMatchUserPrediction } from '../../../../types';
import './UserPredicitons.css'

type Props = {
    predictions: MatchUserPrediction[];
    knockoutPredictions?: KnockoutMatchUserPrediction[];
}

const UserPrediction = ({ predictions, knockoutPredictions }: Props) => {
    const isKnockout = knockoutPredictions !== undefined;
    const hasItems = isKnockout ? knockoutPredictions!.length > 0 : predictions.length > 0;

    return (
        <section className="user-predictions">
          <div className="user-predictions-container">
            <div className="user-predictions-header">
              <h2 className="section-title">Mate Predictions</h2>
              <p className="section-content">
                {hasItems ? 'See which mates called it right.' : 'No predictions done!'}
              </p>
            </div>
            <div className="user-predictions-grid">
                {isKnockout
                    ? knockoutPredictions!.map(p => <KnockoutPredictionCard key={p.id} prediction={p} />)
                    : predictions.map(p => <PredictionCard key={p.id} prediction={p} />)
                }
            </div>
          </div>
        </section>
    )
};

export default UserPrediction;
