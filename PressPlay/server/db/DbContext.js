import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { CommentSchema } from '../models/Comment'
import { ContributionSchema } from '../models/Contribution'
import { ProfileSubscriptionSchema } from '../models/ProfileSubscription'
import { ProjectSchema } from '../models/Project'
import { ProjectSubscriptionsSchema } from '../models/ProjectSubscriptions'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Projects = mongoose.model('Project', ProjectSchema);
  ProfileSubscriptions = mongoose.model('ProfileSubscription', ProfileSubscriptionSchema)
  ProjectSubscriptions = mongoose.model('ProjectSubscription', ProjectSubscriptionsSchema)
  Contributions = mongoose.model('Contribution', ContributionSchema)
  Comments = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
