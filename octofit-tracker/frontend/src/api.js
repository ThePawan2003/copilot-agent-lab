const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const USE_CODESPACE_HOST = Boolean(CODESPACE_NAME)

const API_BASE_URL = USE_CODESPACE_HOST
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function friendlyApiHost() {
  return USE_CODESPACE_HOST ? `${CODESPACE_NAME}-8000.app.github.dev` : 'localhost:8000'
}

function normalizeApiResponse(payload) {
  if (!payload) {
    return []
  }

  if (Array.isArray(payload)) {
    return payload
  }

  if (typeof payload === 'object') {
    if (Array.isArray(payload.data)) {
      return payload.data
    }
    if (Array.isArray(payload.items)) {
      return payload.items
    }
    if (Array.isArray(payload.results)) {
      return payload.results
    }
    return [payload]
  }

  return []
}

export { API_BASE_URL, USE_CODESPACE_HOST, friendlyApiHost, normalizeApiResponse }
