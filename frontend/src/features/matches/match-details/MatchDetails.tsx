import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMatch, getMatchUserPredictions } from '../../../api';
import { ArrowLeftIcon } from '../../../components/icons/Icons';
import UserPrediction from './user-predictions/UserPredictions';
import MatchResult from './match-result/MatchResult';
import GoalScorers from './goal-scorers/GoalScorers';
import type { Match, MatchUserPrediction } from '../../../types';
import "./MatchDetails.css";


const MatchDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [match, setMatch] = useState<Match | null>(null);
    const [userPredictions, setUserPredictions] = useState<MatchUserPrediction[] | []>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      if (!id) return;

      Promise.all([getMatch(Number(id)), getMatchUserPredictions(Number(id))])
        .then(([matchData, userPredictionsData]) => {
          setMatch(matchData);
          setUserPredictions(userPredictionsData)
        })
        .catch(() => setError('Match not found'))
        .finally(() => setLoading(false));
    }, [id]);
    
    return (
      <>
        <header className="header-match-result">          
          <div className="header-match-result__container">
            <div className="header-match-result__top-actions">
              <button
                aria-label="Go back to previous page"
                className="header-match-result__back-btn btn-primary btn"
                onClick={() => navigate(-1)}
              >
                <ArrowLeftIcon size={24} />
                <span>Back</span>
              </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {match && <MatchResult match={match} />}
          </div>
        </header>
        {match?.is_finished && <GoalScorers />}
        <UserPrediction predictions={userPredictions} />
      </>
    );
};

export default MatchDetails;
