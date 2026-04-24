import Navigation from '../../../components/navigation/Navigation'
import Footer from '../../../components/footer/Footer'
import MatchDetails from './MatchDetails'
import './MatchDetailsPage.css'

const MatchDetailsPage = () => {
  return (
    <div className="match-details-container1">   
        <Navigation />
        <MatchDetails />
        <Footer />
    </div>
  )
}

export default MatchDetailsPage;