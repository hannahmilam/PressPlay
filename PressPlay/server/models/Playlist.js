import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PlaylistSchema = new Schema(
  {
    projectId: { type: Number, required: true },
    profileId: { type: String, required: true },
    name: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
PlaylistSchema.virtual('profile', {
  localField: 'profileId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
PlaylistSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
  ref: 'Project'
})
