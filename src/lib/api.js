import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  withCredentials: true,
})

export async function login(username, password) {
  return api.post('/auth/login', { username, password })
}

export async function logout() {
  return api.post('/auth/logout')
}