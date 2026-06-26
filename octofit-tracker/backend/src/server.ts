import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import workoutsRouter from './routes/workouts'
import leaderboardRouter from './routes/leaderboard'

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 8000
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db'
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/workouts', workoutsRouter)
app.use('/api/leaderboard', leaderboardRouter)

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    apiBaseUrl,
  })
})

app.get('/', (_req: Request, res: Response) => {
  res.send('OctoFit Tracker backend is running.')
})

async function start() {
  try {
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection failed:', error)
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Backend listening on port ${port}`)
  })
}

start()
