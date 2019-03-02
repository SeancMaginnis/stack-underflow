import Subcomment from "./subcomment.js"

export default class Comment {
  constructor(data) {
    this.username = data.username
    this.timestamp = data.createdAt || data.timestamp || Date.now()
    this.post = data.post
    this.description = data.description
    this._id = data._id
    this.img = data.img
    this.vote = data.vote
    this.subComments = []
    if (data.subComments) {
      this.subComments = data.subComments.map(c => new Subcomment(c))
    }
  }

  getTemplate() {
    return `
    <div class="col-6 offset-2 comment-card">
        <p>${this.username} - ${this.getTime()} <span onclick="app.controllers.postController.deleteComment('${this._id}')"><i class="fas fa-ban"></i>
        </span></p>
        <img class="active-image" src="${this.img}">
        <p>${this.description}</p>
      
    </div>
    <div class="col-2 comment-card">
          <span onclick="app.controllers.postController.commentVote('${this._id}', 1)" class="icon"><i class="far fa-thumbs-up"></i>
          </span>
          <span onclick="app.controllers.postController.commentVote('${this._id}', -1)" class="icon"><i class="far fa-thumbs-down"></i>
          </span> 
          <p>Votes: ${this.vote} 
    </div>
    <div class="row" id="subcomment"></div>
    `
  }

  get Subcomments() {
    //generate subcomment template
    let template = ''
    this.subComments.sort((a, b) => {
      return b.vote - b.vote
    })
    // this.subComments.sort((a, b) => {
    //   let aDate = new Date(a.createdAt).getTime()
    //   let bDate = new Date(b.createdAt).getTime()
    //   return aDate - bDate
    // })
    this.subComments.forEach(sc => {
      template += sc.getTemplate(this._id)
    })
    return template
  }

  getTime() {
    let date = this.timestamp

    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })

  }
}
