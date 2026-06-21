import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from '../components/scroll-to-top/ScrollToTop'
import ProtectedRoute from '../components/protected-route/ProtectedRoute'
import HomePage from '../features/home/HomePage'
import PageNotFound from '../features/page-not-found/PageNotFound'
import LeaguePage from '../features/league/LeaguePage'
import PredictionPage from '../features/predictions/PredictionPage'
import LeaderboardPage from '../features/leaderboard/LeaderboardPage'
import LoginPage from '../features/auth/LoginPage'
import RegisterPage from '../features/auth/RegisterPage'
import MatchDetailsPage from '../features/matches/match-details/MatchDetailsPage'
import AdminPage from '../features/admin/AdminPage'
import ProfilePage from '../features/auth/profile-page/ProfilePage'

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/league" element={<LeaguePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/match/:id" element={<MatchDetailsPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/predictions" element={<PredictionPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route element={<ProtectedRoute requireSuperuser />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
