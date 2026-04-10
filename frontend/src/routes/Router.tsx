import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import HomePage from '../features/home/HomePage'

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
        <Route path="/login"    element={<div>Login Page</div>} />        
        <Route path="/leaderboard" element={<PrivateRoute><div>Laederboard</div></PrivateRoute>} />
        <Route path="/predictions" element={<PrivateRoute><div>My Predictions</div></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
