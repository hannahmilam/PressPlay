export class Comment {
  constructor(commentData = {}) {
    this.id = commentData.id
    this.body = commentData.body
    this.creatorId = commentData.creatorId
    this.creator = commentData.creator
    this.projectId = commentData.projectId
    this.project = commentData.project
  }
}
