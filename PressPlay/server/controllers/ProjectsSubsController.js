import { Auth0Provider } from '@bcwdev/auth0provider'
import { projectsSubsService } from '../services/ProjectSubsService'
import BaseController from '../utils/BaseController'

export class ProjectsSubsController extends BaseController {
  constructor() {
    super('api')
    this.router
      .get('/projects/:projectId/subscribers', this.getProjectSubscribers)
      .get('/profile/:profileId/projectsSubscriptions', this.getProjectSubscriptionsByProfile)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/projects/:projectId/subscription', this.subscribeToProject)
      .delete('/projects/:projectId/subscription/:subscriptionId', this.unsubscribeProject)
  }

  async getProjectSubscribers(req, res, next) {
    try {
      const projectSubscribers = await projectsSubsService.getProjectSubscribers(req.query)
      res.send(projectSubscribers)
    } catch (error) {
      next(error)
    }
  }

  async getProjectSubscriptionsByProfile(req, res, next) {
    try {
      const projectSubscriptions = await projectsSubsService.getProjectSubscriptionsByProfile(req.params.profileId)
      res.send(projectSubscriptions)
    } catch (error) {
      next(error)
    }
  }

  async subscribeToProject(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const project = await projectsSubsService.subscribeToProject(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async unsubscribeProject(req, res, next) {
    try {
      const project = await projectsSubsService.unsubscribeProject(req.params.id, req.userInfo.id)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }
}
