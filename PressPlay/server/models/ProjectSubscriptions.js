import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ProjectSubscriptionsSchema = new Schema(
  {
profileId: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
projectId: {type: Schema.Types.ObjectId, ref: 'Project', required: true}
},
{timestamps: true, toJSON: {virtuals: true}}
)

ProjectSubscriptionsSchema.virtual('profile', {
  localField: 'profileId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

ProjectSubscriptionsSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
  ref: 'Project'
})