import { profileService } from '../services/ProfileService.js'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger.js'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getProfiles)
      .get('/:profileId', this.getProfile)
  }

  async getProfiles(req, res, next) {
    try {
      const regex = new RegExp(req.query.search, 'i')
      const query = { name: { $regex: regex } }
      logger.log(query)
      const profiles = await profileService.getProfiles(query)
      res.send(profiles)

      // const profiles = await profileService.findProfiles(req.query.name, req.query.offset)
      // res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfileById(req.params.profileId)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }
}
