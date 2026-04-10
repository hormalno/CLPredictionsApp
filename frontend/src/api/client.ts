import axios from 'axios'

const client = axios.create({ baseURL: 'http://localhost:8000/api' })

// Attach token to every request
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('access')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default client
