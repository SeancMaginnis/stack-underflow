export default class Subcomment {
  constructor(data) {
    this.username = data.username
    this.timestamp = data.createdAt || data.timestamp || Date.now()
    this.post = data.post
    this.description = data.description
    this._id = data._id
    this.img = data.img
    this.vote = data.vote

  }
}