import Navigation from '../../../components/navigation/Navigation'
import Footer from '../../../components/footer/Footer'
import MatchDetails from './MatchDetails'
import './MatchDetailsPage.css'
import { useParams } from 'react-router-dom'
import { mockMatches } from '../../../mocks'

const MatchDetailsPage = () => {
  const {id} = useParams();
  const  match = mockMatches[Number(id)-1];

  return (
    <div className="match-details-container1">   
        <Navigation />
        <MatchDetails match={match} />
        <Footer />
    </div>
  )
}

export default MatchDetailsPage;