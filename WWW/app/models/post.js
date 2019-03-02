export default class Post {
  constructor(data) {
    this._id = data._id
    this.title = data.title
    this.description = data.description
    this.img = data.img
    this.username = data.username
    this.timestamp = data.createdAt || data.timestamp || Date.now()
    this.upVote = data.upVote
    this.downVote = data.downVote

  }
  getTemplate() {
    return `
    <div class="col-10 offset-1 plain-card" onclick="app.controllers.postController.setActivePost('${this._id}')">
        <div class="row">
            <div class="col-4 left-side">
                <h5 class="">${this.title}</h5>
            </div>
            <div class="col-4 right-side">
                <img class="img-thumbnail" src="${this.img}">
            </div>
            <div class="col-4 right-side">
            <h6 class="">${this.username}</h6>
                <p class=""> ${this.getTime()}</p>
            </div>
        </div>
    </div>`

  }

  getTime() {
    let date = this.timestamp

    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })


  }

  getActiveTemplate() {
    return `
    <div class="col-10 offset-1 plain-card">
        <div class="row">
            <div class="col-10">
                <h3 class="">${this.title}</h3>
                <h6 class="">${this.username}</h6>
                <p class=""> ${this.getTime()}</p>
                <img class="active-image" src="${this.img}">
                <h6 class="">${this.description}</h6>
                <p>${this.upVote}</p>
            </div>
            <div class="col-1">
                <button type="submit" onclick="app.controllers.postController.deletePost('${this._id}')">Remove Post</button>
                <button type="submit" onclick="app.controllers.postController.upVote('${this._id}')">Up Vote</button>
                <button type="submit" onclick="app.controllers.postController.downVote('${this._id}')">Down Vote</button>
            </div>
            <br>
            <div class="col-12"> 
                <h3> Post Reply </h3>  
                <form onsubmit="app.controllers.postController.addComment(event)">
                <input type="text" name="username" placeholder="User Name" required>
                <input type="text" name="description" placeholder="Description">
                <input type="url" name="img" placeholder="Image URL (Optional)">
                <button type="submit">Submit</button>
                </form>
            </div>
        </div>          
        <div class="row"id="comment"></div>
    </div>
    `
  }
}


{/* <img class="card-img-top" src="${this.img}" alt=""> */ }