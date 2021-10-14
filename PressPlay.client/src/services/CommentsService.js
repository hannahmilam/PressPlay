import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class CommentsService {
  async postComment(commentData) {
    const res = await api.post('api/comments', commentData)
    logger.log('create comment data', res.data)
    AppState.comments.push(res.data)
  }

  async getCommentsByProjectId(projectId) {
    const res = await api.get('api/projects/' + projectId + '/comments')
    logger.log('this is comments for the project', res.data)
    AppState.comments = res.data
  }

  async removeComment(commentId) {
    const res = await api.delete('api/comments/' + commentId)
    logger.log('this comment has been removed', res.data)
    AppState.comments = AppState.comments.filter(c => c.id !== commentId)
  }
}
export const commentsService = new CommentsService()
