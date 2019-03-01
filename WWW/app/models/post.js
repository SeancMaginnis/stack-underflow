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
<div class="col-12">
    <p>${this.title}</p>
    <p>${this.username}</p>
    <p>${this.timestamp}</p>
    <p>${this.description}</p>
    <p>${this.img}</p>
</div>
  `

  }

  getTime() {
    let date = this.timestamp

    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })


  }
}