export default class Comment {
  constructor(data) {
    this.username = data.username
    this.timestamp = data.createdAt || data.timestamp || Date.now()
    this.post = data.post
    this.description = data.description
    this._id = data._id
    this.img = data.img
    this.vote = data.vote
  }

  getTemplate() {
    return `
    <div class="col-6 offset-2 comment-card">
        <p>${this.username} - ${this.getTime()}</p>
        <p>${this.description}</p>
        <img class="active-image" src="${this.img}">
        <p>Votes: ${this.vote}
    </div>
    <div class="col-2 comment-card">
        <span onclick="app.controllers.postController.deleteComment('${this._id}')"><i class="fas fa-ban"></i>
          </span>
        <button type="submit" onclick="app.controllers.postController.commentVote('${this._id}', 1)">Up</button>
        <button type="submit" onclick="app.controllers.postController.commentVote('${this._id}', -1)">down</button>

        
    </div>
    `
  }

  getTime() {
    let date = this.timestamp

    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })


  }

}