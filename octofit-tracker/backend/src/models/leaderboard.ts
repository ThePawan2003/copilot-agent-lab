import { Schema, model, Document, Types } from 'mongoose'

export interface ILeaderboardEntry extends Document {
  user: Types.ObjectId
  totalDistance: number
  totalCalories: number
  totalDuration: number
  rank: number
}

const LeaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalDistance: { type: Number, required: true, default: 0 },
    totalCalories: { type: Number, required: true, default: 0 },
    totalDuration: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
)

export default model<ILeaderboardEntry>('Leaderboard', LeaderboardSchema)
