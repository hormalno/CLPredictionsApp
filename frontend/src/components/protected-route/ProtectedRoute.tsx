import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../features/auth/useAuth'

type Props = { requireSuperuser?: boolean }

const ProtectedRoute = ({ requireSuperuser = false }: Props) => {
    const { isAuthenticated, isSuperuser, loading } = useAuth()

    if (loading) return null
    if (!isAuthenticated) return <Navigate to="/login" replace />
    if (requireSuperuser && !isSuperuser) return <Navigate to="/" replace />
    return <Outlet />
}

export default ProtectedRoute
