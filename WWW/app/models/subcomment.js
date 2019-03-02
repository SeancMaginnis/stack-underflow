export default class Subcomment {
  constructor(data) {
    this.username = data.username
    this.timestamp = data.createdAt || data.timestamp || Date.now()
    this.post = data.post
    this.description = data.description
    this._id = data._id
    this.img = data.img
    this.vote = data.vote
    this.createdAt = data.createdAt || 0
  }

  getTemplate(parentId) {
    return `
      <div class="col-6 offset-2 comment-card">
        <p>${this.username} - ${this.getTime()} <span onclick="app.controllers.postController.deleteSubComment('parentId', ${this._id}')"><i class="fas fa-ban"></i>
        </span></p>
        <img class="active-image" src="${this.img}">
        <p>${this.description}</p>
      
    </div>
    <div class="col-2 comment-card">
          <span onclick="app.controllers.postController.subCommentVote('${parentId}','${this._id}', 1)" class="icon"><i class="far fa-thumbs-up"></i>
          </span>
          <span onclick="app.controllers.postController.subCommentVote('${parentId}','${this._id}', -1) class="icon"><i class="far fa-thumbs-down"></i>
          </span> 
          <p>Votes: ${this.vote} 
        
        
    </div>`

  }

  getTime() {
    let date = this.timestamp

    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })


  }
}