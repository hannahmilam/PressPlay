export class Contribution {
  constructor(contributionData = {}) {
    this.id = contributionData.id
    this.title = contributionData.title
    this.contributionMp3 = contributionData.contributionMp3
    this.projectId = contributionData.projectId
    this.project = contributionData.project
    this.acccountId = contributionData.accountId
    this.collaborator = contributionData.collaborator
    this.fileName = contributionData.fileName
  }
}
