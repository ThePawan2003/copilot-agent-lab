import { Link, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { API_BASE_URL } from './api.js'
import logo from '../../../docs/octofitapp-small.png'
import './App.css'

function HomePage() {
  const healthUrl = `${API_BASE_URL}/health`

  return (
    <div className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <span className="badge text-bg-primary mb-3">OctoFit Tracker</span>
          <h1 className="display-5 fw-bold">Track workouts, teams, and progress in one place.</h1>
          <p className="lead text-muted">
            A modern multi-tier application for athletes and teams to log activities,
            compare performance, and stay motivated.
          </p>
          <div className="d-flex gap-3 flex-wrap mt-4">
            <Link to="/activities" className="btn btn-primary btn-lg">
              View activities
            </Link>
            <a href={healthUrl} className="btn btn-outline-secondary btn-lg">
              Check API health
            </a>
          </div>
        </div>
        <div className="col-lg-5 text-center">
          <img src={logo} alt="OctoFit Tracker logo" className="app-logo" />
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            OctoFit Tracker
          </Link>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/activities">
              Activities
            </Link>
            <Link className="nav-link" to="/workouts">
              Workouts
            </Link>
            <Link className="nav-link" to="/teams">
              Teams
            </Link>
            <Link className="nav-link" to="/users">
              Users
            </Link>
            <Link className="nav-link" to="/leaderboard">
              Leaderboard
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </>
  )
}

export default App
