import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.get('/', (_req: Request, res: Response) => {
  res.send('OctoFit Tracker backend is running.');
});

async function start() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Backend listening on port ${port}`);
  });
}

start();
