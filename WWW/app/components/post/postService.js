import Post from "../../models/post.js";
import Comment from "../../models/comment.js"

//private
// @ts-ignore
let _api = axios.create({
  baseURL: '/api'
})

let _state = {
  posts: [],
  activePost: {},
  comments: []
  //active post will need to go here
}

let _subscribers = {
  posts: [],
  activePost: [],
  comments: []
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

  get ActivePost() {
    return _state.activePost
  }

  get Comments() {
    return _state.comments
  }

  // getComments(id) {
  //   return _state.comments
  // }

  getApiComments(id) {
    _api.get('posts/' + id + '/comments')
      .then(res => {
        let data = res.data.map(c => new Comment(c))
        setState('comments', data)
        if (_state.activePost) {
          setState('activePost', _state.activePost)
        }
      })
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
  addComment(rawComment) {
    rawComment.post = _state.activePost._id
    let newComment = new Comment(rawComment)
    _api.post('comments', newComment)
      .then(res => {
        debugger
        this.getApiComments(newComment.post)
      })
  }

  deletePost(id) {
    _api.delete('posts/' + id)
      .then(res => {
        this.getApiPosts()
      })
  }

  setActivePost(id) {
    _api.get('posts/' + id)
      .then(res => {
        let data = new Post(res.data)
        setState('activePost', data)
      })
  }

  upVote(id) {
    let data = _state.activePost.upVote++
    _api.put('posts/' + id, data)
      .then(res => {
        this.setActivePost(id)
      })
  }
  deleteComment(id) {
    _api.delete('comments/' + id)
      .then(res => {
        this.getApiComments()
      })
  }

}