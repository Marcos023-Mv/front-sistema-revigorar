import { apiClient, isApiConfigured, setToken, clearToken, getToken } from './apiClient.js'
import { CURRENT_USER } from '../data/mockData.js'

/**
 * Endpoint esperado: POST /auth/login
 * Body:   { email, password }
 * Resposta esperada: { token: string, user: { name, role, initials } }
 */
export async function login(email, password) {
  if (!isApiConfigured()) {
    // Sem back-end configurado: aceita qualquer credencial, como no protótipo.
    setToken('demo-token')
    return { user: CURRENT_USER }
  }

  const data = await apiClient.post('/auth/login', { email, password })
  if (data?.token) setToken(data.token)
  return data
}

export function logout() {
  clearToken()
}

export function isAuthenticated() {
  return Boolean(getToken())
}

/**
 * Endpoint esperado: GET /auth/me
 * Resposta esperada: { name, role, initials }
 */
export async function getCurrentUser() {
  if (!isApiConfigured()) return CURRENT_USER
  try {
    return await apiClient.get('/auth/me')
  } catch {
    return CURRENT_USER
  }
}
