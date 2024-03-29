import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    genreTags: { type: String, required: true },
    instrumentTags: { type: [String], required: true },
    neededInstrumentTags: { type: [String], required: true },
    originalMp3: { type: String, required: true },
    spotlightMp3: { type: String, required: false },
    albumArt: { type: String, required: true },
    spotlightName: { type: String, required: false, default: null },
    password: { type: String, required: false, default: null },
    mp3Name: { type: String, required: true },
    artName: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

ProjectSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
