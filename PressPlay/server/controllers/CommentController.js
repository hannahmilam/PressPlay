import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
export class commentController extends BaseController {
  constructor() {
    super('api')
    this.router
      .get('/projects/:projectId/comments', this.getComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/comments', this.createComment)
      .delete('/comments/:commentId', this.deleteComment)
      .put('/comments/:commentId', this.editComment)
  }

  async getComments(req, res, next) {
    try {
      const comments = await commentsService.getComments(req.params.id)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.createComment(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next) {
    try {
      const comment = await commentsService.deleteComment(req.params.id, req.userInfo.id)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async editComment(req, res, next) {
    try {
      const comment = await commentsService.editComment(req.params.id, req.userInfo.id, req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}
