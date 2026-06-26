import { Schema, model, Document, Types } from 'mongoose'

export interface IWorkout extends Document {
  user: Types.ObjectId
  title: string
  notes: string
  scheduledFor: Date
  completed: boolean
  createdAt: Date
}

const WorkoutSchema = new Schema<IWorkout>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    notes: { type: String, default: '' },
    scheduledFor: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export default model<IWorkout>('Workout', WorkoutSchema)
