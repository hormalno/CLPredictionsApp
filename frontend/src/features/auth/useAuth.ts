import { useState, useEffect } from 'react'

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('access'))

    useEffect(() => {
        const onStorage = () => setIsAuthenticated(!!localStorage.getItem('access'))
        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
    }, [])

    const logout = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        setIsAuthenticated(false)
    }

    return { isAuthenticated, logout }
}

export default useAuth
