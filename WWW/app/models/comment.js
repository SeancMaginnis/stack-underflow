export default class Comment {
  constructor(data) {
    this.username = data.username
    this.timestamp = data.createdAt || data.timestamp || Date.now()
    this.post = data.post
    this.description = data.description
    this._id = data._id
    this.img = data.img
  }

  getTemplate() {
    return `
    <div class="col-8 offset-2 comment-card">
        <p>${this.username} - ${this.getTime()}</p>
        <p>${this.description}</p>
        <img src=${this.img}>
        
    </div>
    <div class="col-2 comment-card">
        <button type="submit" onclick="app.controllers.postController.deleteComment('${this._id}')">Remove Comment</button>
    </div>
    `
  }

  getTime() {
    let date = this.timestamp

    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })


  }

}