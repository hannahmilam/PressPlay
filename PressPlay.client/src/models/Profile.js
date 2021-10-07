export class Profile {
  constructor(profileData) {
    this.id = profileData.id
    this.name = profileData.name
    this.picture = profileData.picture
    this.email = profileData.email
    this.bio = profileData.bio 
    this.genreTags = profileData.genreTags
    this.instrumentTags = profileData.instrumentTags
    this.originals = profileData.originals
    this.collaboration = profileData.collaboration
  }
}