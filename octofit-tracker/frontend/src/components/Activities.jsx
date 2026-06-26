import { useEffect, useState } from 'react'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
    : 'http://localhost:8000/api/activities'

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
      .then((payload) => setActivities(normalizeResponse(payload)))
      .catch((fetchError) => setError(fetchError.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-5">
      <h2 className="mb-4">Activities</h2>

      <div className="alert alert-secondary">
        API host: <strong>{friendlyHost}</strong>
        <br />
        {import.meta.env.VITE_CODESPACE_NAME
          ? 'Using Codespaces endpoint with VITE_CODESPACE_NAME.'
          : 'VITE_CODESPACE_NAME is not set. Falling back to http://localhost:8000/api.'}
      </div>

      {loading && <div className="alert alert-info">Loading activity feed...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No activities available.
                  </td>
                </tr>
              ) : (
                activities.map((activity) => {
                  const userName = activity.user?.name || activity.user || 'Unknown'
                  return (
                    <tr key={activity._id || activity.id || `${activity.type}-${activity.date}`}>
                      <td>{new Date(activity.date).toLocaleDateString()}</td>
                      <td>{userName}</td>
                      <td>{activity.type}</td>
                      <td>{activity.durationMinutes ?? '—'} min</td>
                      <td>{activity.distanceKm ?? '—'} km</td>
                      <td>{activity.calories ?? '—'}</td>
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

export default Activities
