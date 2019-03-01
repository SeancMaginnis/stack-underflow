import PostService from "./postService.js";


//private
let _ps = new PostService()

function draw() {
  let posts = _ps.Posts
  let template = ''

  posts.forEach(p => {
    template += p.getTemplate();
  });

  document.getElementById('main').innerHTML = template
  //document.getElementById Form will go here!
}

//public

export default class PostController {
  constructor() {
    _ps.addSubscriber('posts', draw)
    _ps.getApiPosts()
  }
  addPost(event) {
    event.preventDefault();
    let form = event.target
    let newPost = {
      //post model props go here "make: form.make.value,"
    }
    _ps.addPost(newPost)
    form.reset()
  }
  deletePost(id) {
    _ps.deletePost(id)
  }
  // getPosts() {
  //     _ps.getApiPosts()
  // }
}