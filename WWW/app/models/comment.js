export default class Comment {
  constructor(data) {
    this.username = data.username
    this.timestamp = data.createdAt || data.timestamp || Date.now()
    this.postId = data.post
    this.description = data.description
    this._id = data._id
  }

  getTemplate() {
    return `
    <div class="col-10 offset-1 plain-card">
        <p>${this.username} - ${this.timestamp}</p>
        <p>${this.description}</p>
    </div>
    `
  }

  getTime() {
    let date = this.timestamp

    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })


  }

}