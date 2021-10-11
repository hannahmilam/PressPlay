import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class ContributionsService {
  async getContributions(query) {
    const contributions = await dbContext.Contributions.find(query)
    return contributions
  }

  async removeContribution(contributionId, userId) {
    const contribution = await this.getContributionById(contributionId)
    if (userId !== contribution.accountId.toString()) {
      throw new Forbidden('Not Authorized')
    }
    await contribution.remove()
    return contribution
  }

  async createContribution(contributionData) {
    const contribution = await dbContext.Contributions.create(contributionData)
    await contribution.populate('collaborator', 'name picture')
    // REVIEW this might need more specificity
    await contribution.populate('project')
    return contribution
  }

  async getContributionsByProjectId(projectId) {
    const contributions = await dbContext.Contributions.find({ projectId: projectId }).populate('collaborator', 'name picture').populate('project')
    if (!contributions) {
      throw new BadRequest('no contributions here')
    }
    return contributions
  }

  async getContributionById(contributionId) {
    const contribution = await dbContext.Contributions.findById(contributionId).populate('collaborator', 'name picture').populate('project')
    if (!contribution) {
      throw new BadRequest("no sir, no way, that ain't here")
    }
    return contribution
  }
}
export const contributionsService = new ContributionsService()
