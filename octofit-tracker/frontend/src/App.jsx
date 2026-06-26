import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import './App.css'

function HomePage() {
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
            <Link to="/activities" className="btn btn-primary btn-lg">View activities</Link>
            <a href="http://localhost:8000/api/health" className="btn btn-outline-secondary btn-lg">
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

function ActivitiesPage() {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Activity feed</h2>
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <p className="mb-0 text-muted">
            The activity dashboard is ready for the next set of tracker features.
          </p>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
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
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
