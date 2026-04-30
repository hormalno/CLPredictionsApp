import PredictionCard from '../../../predictions/prediction-card/PredictionCard';
import type { MatchUserPrediction } from '../../../../types';
import './UserPredicitons.css'

type Props = {
    predictions: MatchUserPrediction[];
}

const UserPrediction = ({predictions} : Props) => {
    return (
        <section className="user-predictions">
          <div className="user-predictions-container">
            <div className="user-predictions-header">
              <h2 className="section-title"><text>Mate Predictions</text></h2>
              <p className="section-content">
                {predictions.length > 0 
                ? <text>See which mates called it right.</text>
                : <text>No predictions done!</text>}
              </p>
            </div>
            <div className="user-predictions-grid">
                {predictions.length > 0 && predictions.map(prediction => (<PredictionCard prediction={prediction} />))}
                
            </div>
          </div>
        </section>
    )
};

export default UserPrediction;
