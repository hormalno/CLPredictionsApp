import axios from 'axios'

const client = axios.create({ baseURL: 'http://localhost:8000/api' })

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('access')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

client.interceptors.response.use(
  res => res,
  async error => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      const refresh = localStorage.getItem('refresh')
      if (refresh) {
        try {
          const { data } = await axios.post('http://localhost:8000/api/auth/token/refresh/', { refresh })
          localStorage.setItem('access', data.access)
          original.headers.Authorization = `Bearer ${data.access}`
          return client(original)
        } catch {
          localStorage.removeItem('access')
          localStorage.removeItem('refresh')
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  }
)

export function parseApiError(err: unknown): string {
    if (axios.isAxiosError(err) && err.response?.data) {
        const data = err.response.data;
        if (typeof data === 'string') return data;
        if (data.detail) return data.detail;
        const messages = Object.entries(data).flatMap(([field, msgs]) =>
            Array.isArray(msgs)
                ? (msgs as string[]).map(m => `${field}: ${m}`)
                : [`${field}: ${msgs}`]
        );
        if (messages.length) return messages.join(' · ');
    }
    return 'Something went wrong.';
}

export default client
