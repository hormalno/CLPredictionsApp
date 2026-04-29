import { useState, useEffect } from 'react'
import client from '../../api/client'

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('access'))
    const [userId, setUserId] = useState<number | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [isSuperuser, setIsSuperuser] = useState(false)
    const [loading, setLoading] = useState(() => !!localStorage.getItem('access'))

    useEffect(() => {
        if (!isAuthenticated) {
            setLoading(false)
            return
        }
        let cancelled = false
        client.get('/auth/me/')
            .then(res => {
                if (!cancelled) {
                    setUserId(res.data.id)
                    setUsername(res.data.username)
                    setIsSuperuser(res.data.is_superuser ?? false)
                }
            })
            .catch(() => {})
            .finally(() => { if (!cancelled) setLoading(false) })
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
        setUserId(null)
        setUsername(null)
        setIsSuperuser(false)
    }

    return { isAuthenticated, userId, username, isSuperuser, loading, logout }
}

export default useAuth
