import { fetchData } from './fetcher'
import { setAuthToken, clearAuthToken } from '@/utils/token'

export async function login(name, password) {
  const res = await fetchData('/login', {
    method: 'POST',
    body: JSON.stringify({ Name: name, Password: password }),
  })

  if (!res.token) {
    throw new Error('Token non fourni par le backend.')
  }

  setAuthToken(res.token)
  return res
}

export async function logout() {
  try {
    await fetchData('/logout', { method: 'POST' })
  } catch (e) {
    console.error('Erreur lors de la déconnexion :', e)
    // Ne pas lever d'erreur pour éviter d'empêcher la suppression du token
  } finally {
    clearAuthToken()
  }
}
