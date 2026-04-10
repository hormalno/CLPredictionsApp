import client from './client'

export interface RegisterData {
  username: string
  email: string
  password: string
  password2: string
}

export const login = (username: string, password: string) =>
  client.post('/auth/token/', { username, password })

export const register = (data: RegisterData) =>
  client.post('/auth/register/', data)

export const refreshToken = (refresh: string) =>
  client.post('/auth/token/refresh/', { refresh })

export const getMe = () =>
  client.get('/auth/me/')
