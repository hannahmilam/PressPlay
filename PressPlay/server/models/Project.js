import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    genreTags: { type: String, required: true },
    instrumentTags: { type: String, required: true },
    neededInstrumentTags: { type: String, required: true }
  // spotlight: { type: String }, TODO review spotlight
  // followers: {} TODO we are confused about how to put this on the schema...
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

ProjectSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
