export class Profile {
  constructor(profileData) {
    this.id = profileData.id
    this.name = profileData.name
    this.picture = profileData.picture || ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB0Q7C35IjUnEFF1XDxd0hb6MHNNmRb3N3Ig&usqp=CAU')
    this.email = profileData.email
    this.bio = profileData.bio
    this.genreTags = profileData.genreTags
    this.instrumentTags = profileData.instrumentTags
    this.coverImg = profileData.coverImg
  }
}
