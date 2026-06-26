import { useEffect, useState } from 'react'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
    : 'http://localhost:8000/api/workouts'

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
      .then((payload) => setWorkouts(normalizeResponse(payload)))
      .catch((fetchError) => setError(fetchError.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-5">
      <h2 className="mb-4">Workouts</h2>

      <div className="alert alert-secondary">
        API host: <strong>{friendlyHost}</strong>
        <br />
        {import.meta.env.VITE_CODESPACE_NAME
          ? 'Using Codespaces endpoint with VITE_CODESPACE_NAME.'
          : 'VITE_CODESPACE_NAME is not set. Falling back to http://localhost:8000/api.'}
      </div>

      {loading && <div className="alert alert-info">Loading workouts...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>User</th>
                <th>Schedule</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">
                    No workouts available.
                  </td>
                </tr>
              ) : (
                workouts.map((workout) => {
                  const userName = workout.user?.name || workout.user || 'Unknown'
                  return (
                    <tr key={workout._id || workout.id || workout.title}>
                      <td>{workout.title || 'Untitled'}</td>
                      <td>{userName}</td>
                      <td>{workout.scheduledFor ? new Date(workout.scheduledFor).toLocaleDateString() : 'TBD'}</td>
                      <td>{workout.completed ? 'Yes' : 'No'}</td>
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

export default Workouts
