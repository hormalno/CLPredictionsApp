import { useState, useEffect } from 'react'
import client from '../../api/client'

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('access'))
    const [username, setUsername] = useState<string | null>(null)

    useEffect(() => {
        if (!isAuthenticated) return
        let cancelled = false
        client.get('/auth/me/')
            .then(res => { if (!cancelled) setUsername(res.data.username) })
            .catch(() => {})
        return () => { cancelled = true }
    }, [isAuthenticated])

    useEffect(() => {
        const onStorage = () => setIsAuthenticated(!!localStorage.getItem('access'))
        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
    }, [])

    const logout = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        setIsAuthenticated(false)
        setUsername(null)
    }

    return { isAuthenticated, username, logout }
}

export default useAuth
