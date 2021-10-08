export class Project {
  constructor(projectData = {}) {
    this.id = projectData.id
    this.name = projectData.name
    this.description = projectData.description
    this.creatorId = projectData.creatorId
    this.creator = projectData.creator
    this.genreTags = projectData.genreTags
    this.instrumentTags = projectData.instrumentTags
    this.neededInstrumentTags = projectData.neededInstrumentTags
  }
}
