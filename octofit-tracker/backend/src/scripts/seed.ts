import mongoose from 'mongoose'
import User from '../models/user'
import Team from '../models/team'
import Activity from '../models/activity'
import Workout from '../models/workout'
import Leaderboard from '../models/leaderboard'

// Seed the octofit_db database with test data
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db'

async function seed() {
  await mongoose.connect(mongoUri)
  console.log('Connected to MongoDB for seeding')

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ])

  const users = await User.create([
    { name: 'Avery Miller', email: 'avery.miller@example.com', role: 'athlete' },
    { name: 'Jordan Lee', email: 'jordan.lee@example.com', role: 'coach' },
    { name: 'Priya Shah', email: 'priya.shah@example.com', role: 'manager' },
  ])

  const [athlete, coach, manager] = users

  const teams = await Team.create([
    {
      name: 'Sunrise Sprinters',
      description: 'Morning run club focused on consistency and community.',
      members: [athlete._id, coach._id],
    },
    {
      name: 'Peak Performance',
      description: 'Cross-training team for endurance and strength.',
      members: [athlete._id, manager._id],
    },
  ])

  const activities = await Activity.create([
    {
      user: athlete._id,
      type: 'Running',
      durationMinutes: 45,
      distanceKm: 10,
      calories: 650,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    },
    {
      user: athlete._id,
      type: 'Cycling',
      durationMinutes: 60,
      distanceKm: 25,
      calories: 750,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    },
    {
      user: coach._id,
      type: 'Yoga',
      durationMinutes: 50,
      distanceKm: 0,
      calories: 220,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    },
  ])

  const workouts = await Workout.create([
    {
      user: athlete._id,
      title: 'Interval Run',
      notes: 'Warm up, then alternate 4 min fast / 2 min easy for 5 rounds.',
      scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 24),
      completed: false,
    },
    {
      user: athlete._id,
      title: 'Strength Circuit',
      notes: 'Bodyweight circuit with push-ups, lunges, and core drills.',
      scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 48),
      completed: false,
    },
  ])

  const leaderboard = await Leaderboard.create([
    {
      user: athlete._id,
      totalDistance: 35,
      totalCalories: 1400,
      totalDuration: 105,
      rank: 1,
    },
    {
      user: coach._id,
      totalDistance: 0,
      totalCalories: 220,
      totalDuration: 50,
      rank: 2,
    },
  ])

  console.log('Seeded users:', users.length)
  console.log('Seeded teams:', teams.length)
  console.log('Seeded activities:', activities.length)
  console.log('Seeded workouts:', workouts.length)
  console.log('Seeded leaderboard entries:', leaderboard.length)

  await mongoose.disconnect()
  console.log('Disconnected from MongoDB after seeding')
}

seed().catch((error) => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
