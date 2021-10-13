import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { projectsService } from '../services/ProjectsService'
import { logger } from '../utils/Logger'
import { contributionsService } from '../services/ContributionsService'
import { commentsService } from '../services/CommentsService'

export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .get('', this.getProjects)
      .get('/:projectId', this.getProjectById)
      // .get('/profile/:profileId/projects', this.getProjectsByProfileId)
      .get('/:projectId/contributions', this.getContributionsByProjectId)
      .get('/:projectId/comments', this.getComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createProject)
      .put('/:projectId', this.editProject)
      .delete('/:projectId', this.deleteProject)
  }

  async getProjects(req, res, next) {
    try {
      const regex = new RegExp(req.query.search, 'i')
      const query = { $or: [{ name: { $regex: regex } }, { genreTags: { $regex: regex } }, { instrumentTags: { $regex: regex } }, { neededInstrumentTags: { $regex: regex } }] }
      logger.log(query)
      const projects = await projectsService.getProjects(query)

      res.send(projects)
    } catch (error) {
      next(error)
    }
  }
  // async getProjects(req, res, next) {
  //   try {
  //     const projects = await projectsService.getProjects(req.query)
  //     res.send(projects)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async getProjectById(req, res, next) {
    try {
      const project = await projectsService.getProjectById(req.params.projectId)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  // async getProjectsByProfileId(req, res, next) {
  //   try {
  //     const profileProjects = await projectsService.getProfileProjects(req.params.profileId)
  //     res.send(profileProjects)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async getContributionsByProjectId(req, res, next) {
    try {
      const contribution = await contributionsService.getContributionsByProjectId(req.params.projectId)
      res.send(contribution)
    } catch (error) {
      next(error)
    }
  }

  async getComments(req, res, next) {
    try {
      const comments = await commentsService.getComments(req.params.projectId)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async createProject(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.spotlightMp3 = req.body.originalMp3
      const project = await projectsService.createProject(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async editProject(req, res, next) {
    try {
      const project = await projectsService.editProject(req.params.projectId, req.userInfo.id, req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async deleteProject(req, res, next) {
    try {
      const project = await projectsService.deleteProject(req.params.projectId, req.userInfo.id)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }
}
