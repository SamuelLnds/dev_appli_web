const API_URL = import.meta.env.VITE_API_URL

// Détermine si la requête a besoin d'un CSRF token, donc si elle n'est pas de type GET
// Permet de ne pas appeler csrf-cookie pour les requêtes GET
function needsCsrf(method) {
  return ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method?.toUpperCase())
}

export async function fetchData(endpoint, options = {}) {
  const method = options.method || 'GET'

  // Appeler csrf-cookie si nécessaire, donc pas pour les requêtes GET
  if (needsCsrf(method)) {
    await fetch(`${API_URL.replace('/api', '')}/sanctum/csrf-cookie`, {
      credentials: 'include',
    })
  }

  // Récupère le token CSRF depuis le cookie
  const getXsrfToken = () => {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
    return match ? decodeURIComponent(match[1]) : null
  }

  const xsrfToken = getXsrfToken()

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(xsrfToken ? { 'X-XSRF-TOKEN': xsrfToken } : {}),
      ...(options.headers || {}),
    },
    credentials: 'include',
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || `Erreur HTTP ${res.status}`)
  }

  return res.json()
}
