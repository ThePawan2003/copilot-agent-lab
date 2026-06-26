import { Router, Request, Response } from 'express'
import Workout from '../models/workout'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('user').sort({ scheduledFor: 1 }).limit(100)
    res.json(workouts)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch workouts', details: error })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { user, title, notes, scheduledFor, completed = false } = req.body
    const workout = await Workout.create({ user, title, notes, scheduledFor, completed })
    res.status(201).json(workout)
  } catch (error) {
    res.status(400).json({ error: 'Unable to create workout', details: error })
  }
})

export default router
