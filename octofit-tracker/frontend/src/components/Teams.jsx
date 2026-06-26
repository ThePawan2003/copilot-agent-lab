import { useEffect, useState } from 'react'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
    : 'http://localhost:8000/api/teams'

  const friendlyHost = import.meta.env.VITE_CODESPACE_NAME
    ? `${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
    : 'localhost:8000'

  const normalizeResponse = (payload) => {
    if (!payload) return []
    if (Array.isArray(payload)) return payload
    if (typeof payload === 'object') {
      if (Array.isArray(payload.data)) return payload.data
      if (Array.isArray(payload.items)) return payload.items
      if (Array.isArray(payload.results)) return payload.results
    }
    return []
  }

  useEffect(() => {

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`)
        }
        return response.json()
      })
      .then((payload) => setTeams(normalizeResponse(payload)))
      .catch((fetchError) => setError(fetchError.message))
      .finally(() => setLoading(false))
  }, [])

  const renderMembers = (team) => {
    if (!Array.isArray(team.members) || team.members.length === 0) {
      return 'No members'
    }

    return team.members
      .map((member) => member?.name || member || 'Unknown')
      .join(', ')
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Teams</h2>

      <div className="alert alert-secondary">
        API host: <strong>{friendlyHost}</strong>
        <br />
        {import.meta.env.VITE_CODESPACE_NAME
          ? 'Using Codespaces endpoint with VITE_CODESPACE_NAME.'
          : 'VITE_CODESPACE_NAME is not set. Falling back to http://localhost:8000/api.'}
      </div>

      {loading && <div className="alert alert-info">Loading teams...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row gy-3">
          {teams.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-muted text-center">No teams found.</div>
            </div>
          ) : (
            teams.map((team) => (
              <div className="col-md-6" key={team._id || team.id || team.name}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title mb-2">{team.name}</h5>
                    <p className="card-text text-muted">{team.description || 'No description available.'}</p>
                    <p className="mb-1">
                      <strong>Members:</strong> {Array.isArray(team.members) ? team.members.length : 'Unknown'}
                    </p>
                    <p className="mb-0">
                      <strong>Roster:</strong> {renderMembers(team)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Teams
