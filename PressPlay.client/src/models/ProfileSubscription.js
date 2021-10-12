export class ProfileSubscription {
  constructor(profileSubData) {
    this.id = profileSubData.id
    this.subscriber = profileSubData.subscriber
    this.subscriberId = profileSubData.subscriberId
    this.subscribing = profileSubData.subscribing
    this.subscribingId = profileSubData.subscribingId
  }
}
