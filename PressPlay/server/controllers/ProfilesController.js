import { profileService } from '../services/ProfileService.js'
import BaseController from '../utils/BaseController'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getProfiles)
      .get('/:profileId', this.getProfile)
      .get('/:prifoileId/projects', this.getProjectsByProfileId)
  }

  async getProjectsByProfileId(req, res, next) {
    try {
      const profileProjects = await profileService.getProfileProjects(req.params.profileId)
    } catch (error) {
      next(error)
    }
  }

  async getProfiles(req, res, next) {
    try {
      const profiles = await profileService.findProfiles(req.query.name, req.query.offset)
      res.send(profiles)
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
