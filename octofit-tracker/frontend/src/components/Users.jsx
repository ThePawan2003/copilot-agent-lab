import { useEffect, useState } from 'react'
import { API_BASE_URL, USE_CODESPACE_HOST, friendlyApiHost, normalizeApiResponse } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const endpoint = `${API_BASE_URL}/users`

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`)
        }
        return response.json()
      })
      .then((payload) => setUsers(normalizeApiResponse(payload)))
      .catch((fetchError) => setError(fetchError.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-5">
      <h2 className="mb-4">Users</h2>

      <div className="alert alert-secondary">
        API host: <strong>{friendlyApiHost()}</strong>
        <br />
        {USE_CODESPACE_HOST
          ? 'Using Codespaces endpoint with VITE_CODESPACE_NAME.'
          : 'VITE_CODESPACE_NAME is not set. Falling back to http://localhost:8000/api.'}
      </div>

      {loading && <div className="alert alert-info">Loading users...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-muted">
                    No users available.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id || user.id || user.email}>
                    <td>{user.name || 'Unknown'}</td>
                    <td>{user.email || 'No email'}</td>
                    <td>{user.role || 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Users
