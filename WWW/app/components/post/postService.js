import Post from "../../models/post.js";

//private
// @ts-ignore
let _api = axios.create({
  baseURL: '//localhost:3000/api'
})

let _state = {
  posts: []
  //active post will need to go here
}

let _subscribers = {
  posts: []
}

function setState(prop, data) {
  _state[prop] = data
  _subscribers[prop].forEach(fn => fn());
}

//public
export default class PostService {
  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }

  get Posts() {
    return _state.posts.map(p => new Post(p))
  }

  getApiPosts() {
    _api.get('posts')
      .then(res => {
        let data = res.data.map(p => new Post(p))
        setState('posts', data)
      })
  }

  addPost(rawPost) {
    let newPost = new Post(rawPost)
    _api.post('posts', newPost)
      .then(res => {
        this.getApiPosts()
      })
  }

  deletePost(id) {
    _api.delete('posts/' + id)
      .then(res => {
        this.getApiPosts()
      })
  }

}