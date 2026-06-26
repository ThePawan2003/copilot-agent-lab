import { Router, Request, Response } from 'express'
import Team from '../models/team'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('members').limit(50)
    res.json(teams)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch teams', details: error })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, members = [] } = req.body
    const team = await Team.create({ name, description, members })
    res.status(201).json(team)
  } catch (error) {
    res.status(400).json({ error: 'Unable to create team', details: error })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id).populate('members')
    if (!team) {
      return res.status(404).json({ error: 'Team not found' })
    }
    res.json(team)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch team', details: error })
  }
})

export default router
