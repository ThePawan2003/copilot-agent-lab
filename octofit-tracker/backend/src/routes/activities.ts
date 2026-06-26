import { Router, Request, Response } from 'express'
import Activity from '../models/activity'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('user').sort({ date: -1 }).limit(100)
    res.json(activities)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch activities', details: error })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { user, type, durationMinutes, distanceKm, calories, date } = req.body
    const activity = await Activity.create({ user, type, durationMinutes, distanceKm, calories, date })
    res.status(201).json(activity)
  } catch (error) {
    res.status(400).json({ error: 'Unable to create activity', details: error })
  }
})

export default router
