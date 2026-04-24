import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import HomePage from '../features/home/HomePage'
import PageNotFound from '../features/page-not-found/PageNotFound'
import LeaguePage from '../features/league/LeaguePage'
import PredictionPage from '../features/predictions/PredictionPage'
import LeaderboardPage from '../features/leaderboard/LeaderboardPage'
import LoginPage from '../features/auth/LoginPage'
import RegisterPage from '../features/auth/RegisterPage'
import MatchDetailsPage from '../features/matches/match-details/MatchDetailsPage'

// Uncomment as you build each feature
// import LoginPage from './features/auth/LoginPage'
// import RegisterPage from './features/auth/RegisterPage'
// import HomePage from './features/home/HomePage'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('access')
  return token ? <>{children}</> : <Navigate to="/login" replace />
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile"    element={<PrivateRoute><div>My profile</div></PrivateRoute>} />     
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register"    element={<RegisterPage />} />
        <Route path="/predictions" element={<PredictionPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/league" element={<LeaguePage />} />
        <Route path="/1" element={<MatchDetailsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
