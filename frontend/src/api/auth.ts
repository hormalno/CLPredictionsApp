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

export interface UserMe {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  points: number
  is_superuser: boolean
}

export const getMe = () =>
  client.get<UserMe>('/auth/me/')

export type UpdateMeData = Partial<Pick<UserMe, 'username' | 'email' | 'first_name' | 'last_name'>>

export const updateMe = (data: UpdateMeData) =>
  client.patch<UserMe>('/auth/me/', data)

export interface ChangePasswordData {
  current_password: string
  new_password: string
}

export const changePassword = (data: ChangePasswordData) =>
  client.post('/auth/change-password/', data)

export interface LeaderboardEntry {
  id: number
  username: string
  first_name: string
  last_name: string
  points: number
  outcome_count: number
  exact_count: number
  rank: number
  trend: 'up' | 'down' | 'same' | 'new'
}

export const getLeaderboard = () =>
  client.get<LeaderboardEntry[]>('/auth/leaderboard/').then(res => res.data)
