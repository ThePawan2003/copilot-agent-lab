import { useEffect, useState } from 'react'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
    : 'http://localhost:8000/api/leaderboard'

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
      .then((payload) => setLeaders(normalizeResponse(payload)))
      .catch((fetchError) => setError(fetchError.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-5">
      <h2 className="mb-4">Leaderboard</h2>

      <div className="alert alert-secondary">
        API host: <strong>{friendlyHost}</strong>
        <br />
        {import.meta.env.VITE_CODESPACE_NAME
          ? 'Using Codespaces endpoint with VITE_CODESPACE_NAME.'
          : 'VITE_CODESPACE_NAME is not set. Falling back to http://localhost:8000/api.'}
      </div>

      {loading && <div className="alert alert-info">Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>User</th>
                <th>Total Distance</th>
                <th>Total Calories</th>
                <th>Total Duration</th>
                <th>Activities</th>
              </tr>
            </thead>
            <tbody>
              {leaders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No leaderboard records available.
                  </td>
                </tr>
              ) : (
                leaders.map((leader) => {
                  const userLabel = leader._id?.name || leader._id || 'Unknown'
                  return (
                    <tr key={leader._id || JSON.stringify(leader)}>
                      <td>{userLabel}</td>
                      <td>{leader.totalDistance ?? 0} km</td>
                      <td>{leader.totalCalories ?? 0}</td>
                      <td>{leader.totalDuration ?? 0} min</td>
                      <td>{leader.activities ?? 0}</td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Leaderboard
