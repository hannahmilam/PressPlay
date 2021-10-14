import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class CommentsService {
  async postComment(commentData) {
    const res = await api.post('api/comments', commentData)
    logger.log('create comment data', res.data)
    AppState.comments.push(new Comment(res.data))
    return res.data
  }

  async getCommentsByProjectId(projectId) {
    const res = await api.get('api/projects/' + projectId + '/comments')
    logger.log('this is comments for the project', res.data)
    AppState.comments = res.data
  }
}
export const commentsService = new CommentsService()
