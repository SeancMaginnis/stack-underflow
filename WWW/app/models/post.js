export default class Post {
  constructor(data) {
    this.title = data.title
    this.description = data.description
    this.img = data.img
    this.username = data.username
    this.timestamp = data.createdAt || Date.now()

  }
  getTemplate() {
    return `
    <div class="col-3 card">
        <img class="card-img-top" src="${this.img}" alt="">
            <div class="card-body">
                <h5 class="card-title">${this.title}</h5>
                <p class="card-text">${this.username}---${this.timestamp} </p>
                <p class="card-text">${this.description}</p>
              
            </div>
        </div>`

  }

  getTime() {
    let date = this.timestamp

    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })


  }
}