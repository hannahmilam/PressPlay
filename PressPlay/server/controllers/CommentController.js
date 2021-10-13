import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
export class CommentController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      // .get('/projects/:projectId/comments', this.getComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:commentId', this.deleteComment)
      .put('/:commentId', this.editComment)
  }

  async getComments(req, res, next) {
    try {
      const comments = await commentsService.getComments(req.params.projectId)
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
      const comment = await commentsService.deleteComment(req.params.commentId, req.userInfo.id)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async editComment(req, res, next) {
    try {
      const comment = await commentsService.editComment(req.params.commentId, req.userInfo.id, req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}
