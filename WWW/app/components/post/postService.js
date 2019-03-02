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
    let active = _state.activePost
    _api.put('posts/' + id, active)
      .then(res => {
        this.setActivePost(id)
      })
  }

  downVote(id) {
    let data = _state.activePost.downVote--
    let active = _state.activePost
    _api.put('posts/' + id, active)
      .then(res => {
        this.setActivePost(id)
      })
  }
  commentVote(id, num) {
    let comment = _state.comments.find(c => c._id == id)
    comment.vote += num
    _api.put('comments/' + id, comment)
      .then(res => {
        setState('activePost', _state.activePost)
      })

    // let house = _state.houses.find(h => h._id == id)
    // house.price = parseInt(house.price)
    // house.price++
    // _api.put('houses/' + house._id, house)
    //   .then(res => {
    //     this.getApiHouses()
    //   })
  }

  deleteComment(id) {
    _api.delete('comments/' + id)
      .then(res => {
        console.log(res)
        this.getApiComments(_state.activePost._id)
      })
  }

}