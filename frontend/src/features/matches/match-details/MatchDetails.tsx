import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMatch, getUserPredictionsPerMatch, getKnockoutPredictionsPerMatch } from '../../../api';
import { ArrowLeftIcon } from '../../../components/icons/Icons';
import UserPrediction from './user-predictions/UserPredictions';
import MatchResult from './match-result/MatchResult';
import GoalScorers from './goal-scorers/GoalScorers';
import type { MatchDetail, MatchUserPrediction, KnockoutMatchUserPrediction } from '../../../types';
import matchBg from '../../../assets/match_details.jpg';
import "./MatchDetails.css";

const KNOCKOUT_ROUNDS = new Set(['R32', 'R16', 'QF', 'SF', '3P', 'F']);

const MatchDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [match, setMatch] = useState<MatchDetail | null>(null);
    const [userPredictions, setUserPredictions] = useState<MatchUserPrediction[]>([]);
    const [knockoutPredictions, setKnockoutPredictions] = useState<KnockoutMatchUserPrediction[] | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      if (!id) return;

      getMatch(Number(id))
        .then(matchData => {
          setMatch(matchData);
          const isKnockout = KNOCKOUT_ROUNDS.has(matchData.round);
          const predictionsFetch = isKnockout
            ? getKnockoutPredictionsPerMatch(Number(id)).then(data => {
                setKnockoutPredictions(data);
                setUserPredictions([]);
              })
            : getUserPredictionsPerMatch(Number(id)).then(data => {
                setUserPredictions(data);
                setKnockoutPredictions(undefined);
              });
          return predictionsFetch;
        })
        .catch(() => setError('Match not found'))
        .finally(() => setLoading(false));
    }, [id]);

    return (
      <>
        <header className="header-match-result">
          <div className="header-match-result__bg">
            <img
              src={matchBg}
              className="header-match-result__video"
            ></img>
            <div className="header-match-result__overlay"></div>
          </div>
          <div className="header-match-result__inner">
            <button
              aria-label="Go back to previous page"
              className="header-match-result__back-btn btn-primary btn"
              onClick={() => navigate(-1)}
            >
              <ArrowLeftIcon size={24} />
              <span>Back</span>
            </button>
            <div className="header-match-result__container">
              {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}
              {match && <MatchResult match={match} />}
            </div>
          </div>
        </header>
        {match?.is_finished && <GoalScorers match={match} />}
        {match?.is_closed && (
          <UserPrediction
            predictions={userPredictions}
            knockoutPredictions={knockoutPredictions}
          />
        )}
      </>
    );
};

export default MatchDetails;
