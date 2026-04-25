import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navigation from '../../../components/navigation/Navigation'
import Footer from '../../../components/footer/Footer'
import MatchDetails from './MatchDetails'
import { getMatch } from '../../../api/matches'
import type { Match } from '../../../types'
import './MatchDetailsPage.css'

const MatchDetailsPage = () => {
  const { id } = useParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getMatch(Number(id))
      .then(setMatch)
      .catch(() => setError('Match not found'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="match-details-container1">
      <Navigation />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {match && <MatchDetails match={match} />}
      <Footer />
    </div>
  );
};

export default MatchDetailsPage;
