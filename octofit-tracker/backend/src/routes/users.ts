import { Router, Request, Response } from 'express'
import User from '../models/user'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find().limit(50)
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch users', details: error })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch user', details: error })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, role } = req.body
    const user = await User.create({ name, email, role })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: 'Unable to create user', details: error })
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({ error: 'Unable to update user', details: error })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete user', details: error })
  }
})

export default router
