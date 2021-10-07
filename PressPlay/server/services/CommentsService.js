import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { projectsService } from './ProjectsService'

class CommentsService {
  async getComments(query) {
    const comments = await dbContext.Comments.find(query).populate('creator', 'name picture')
    return comments
  }

  async getCommentById(commentId) {
    const comment = dbContext.Comments.findById(commentId).populate('creator', 'name picture')
    if (!comment) {
      throw new BadRequest('Invalid Comment Id')
    }
    return comment
  }

  async createComment(body) {
    await projectsService.getProjectById(body.projectId)
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator', 'name picture')
    return comment
  }

  async deleteComment(commentId, userId) {
    const comment = await this.getCommentById(commentId)
    if (userId !== comment.creatorId.toString()) {
      throw new Forbidden('Not Authorized')
    }
    await comment.remove()
    return comment
  }

  async editComment(commentId, userId, commentData) {
    const comment = await this.getCommentById(commentId)
    if (userId !== comment.creatorId.toString()) {
      throw new Forbidden('Not Authorized')
    }
    comment.body = commentData.body || comment.body

    await comment.save()
    return comment
  }
}
export const commentsService = new CommentsService()
