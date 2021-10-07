import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const ContributionSchema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    contributionMp3: { type: String, required: true }

  },
  { timestamps: true, toJSON: { virtuals: true } }
)

ContributionSchema.virtual('collaborator', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

ContributionSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
  ref: 'Project'
})
