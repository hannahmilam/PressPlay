import BaseController from "../utils/BaseController";
import { Auth0Provider } from '@bcwdev/auth0provider'
import { projectsService } from "../services/ProjectsService";

export class ProjectsController extends BaseController{
constructor(){
  super('api')
  this.router
  .get('/projects', this.getProjects)
  .get('/projects/:projectId', this.getProjectById)
  .get('/profile/:profileId/projects', this.getProjectsByProfileId)
  // .get(':/projectId/comments', this.getComments) TODO needs to move to comments controller... need to make comments controller.
  // .get(':/projectId/subs', this.getProjectSubscribers) TODO need to move to subs controller
  // .get(':/projectId/contributions', this.getProjectContributions) TODO need to move to contributions controller
  .use(Auth0Provider.getAuthorizedUserInfo)
  .post('/projects', this.createProject)
  .put('/projects/:projectId', this.editProject)
  .delete('/projects/:projectId', this.deleteProject)


}
  async getProjects(req, res, next) {
    try {
      const projects = await projectsService.getProjects(req.query)
      res.send(projects)
    } catch (error) {
      next(error)
    }
  }
  async getProjectById(req, res, next) {
    try {
      const project = await projectsService.getProjectById(req.params.projectId)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }
  async getProjectsByProfileId(req, res, next) {
    try {
      const profileProjects = await projectsService.getProfileProjects(req.params.profileId)
    } catch (error) {
      next(error)
    }
  }
  async createProject(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
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