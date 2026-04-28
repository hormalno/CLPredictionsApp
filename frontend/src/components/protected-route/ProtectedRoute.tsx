import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () =>
    localStorage.getItem('access') ? <Outlet /> : <Navigate to="/login" replace />

export default ProtectedRoute
