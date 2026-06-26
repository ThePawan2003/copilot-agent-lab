import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  role: 'athlete' | 'coach' | 'manager'
  joinedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ['athlete', 'coach', 'manager'],
      default: 'athlete',
    },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export default model<IUser>('User', UserSchema)
