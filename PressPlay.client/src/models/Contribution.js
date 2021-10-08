export class Contribution {
  constructor(contributionData) {
    this.id = contributionData.id
    this.title = contributionData.title
    this.contributionMp3 = contributionData.contributionMp3
    this.projectId = contributionData.projectId
    this.project = contributionData.project
    this.accountId = contributionData.accountId
    this.account = contributionData.account
  }
}
