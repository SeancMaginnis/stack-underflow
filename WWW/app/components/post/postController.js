import PostService from "./postService.js";


//private
let _ps = new PostService()

function draw() {
  let posts = _ps.Posts
  let template = ''

  posts.forEach(p => {
    template += p.getTemplate();
  });

  document.getElementById('posts').innerHTML = template

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
      title: form.title.value,
      username: form.username.value,
      description: form.description.value,
      img: form.img.value
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