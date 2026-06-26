import { Router, Request, Response } from 'express'
import Activity from '../models/activity'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await Activity.aggregate([
      {
        $group: {
          _id: '$user',
          totalDistance: { $sum: '$distanceKm' },
          totalCalories: { $sum: '$calories' },
          totalDuration: { $sum: '$durationMinutes' },
          activities: { $sum: 1 },
        },
      },
      { $sort: { totalDistance: -1, totalCalories: -1 } },
      { $limit: 20 },
    ])

    res.json(leaderboard)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch leaderboard', details: error })
  }
})

export default router
