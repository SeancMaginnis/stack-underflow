import PostService from "./postService.js";


//private
let _ps = new PostService()

function draw() {
  let posts = _ps.Posts
  posts.sort((a, b) => {
    return b.score - a.score
  })
  let template = ''

  posts.forEach(p => {
    template += p.getTemplate();
  });

  document.getElementById('posts').innerHTML = template
}



function drawActive() {
  let activePost = _ps.ActivePost
  document.getElementById('posts').innerHTML = activePost.getActiveTemplate()
  let comments = _ps.Comments
  comments.sort((a, b) => {
    return b.vote - a.vote
  })

  let commentTemplate = ''
  comments.forEach(c => {
    commentTemplate += c.getTemplate()
  })
  document.getElementById('comment').innerHTML = commentTemplate;
}


//public

export default class PostController {
  constructor() {
    _ps.addSubscriber('posts', draw)
    _ps.addSubscriber('activePost', drawActive)
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
  addComment(event) {
    event.preventDefault();
    let form = event.target
    let newComment = {
      username: form.username.value,
      description: form.description.value,
      img: form.img.value
    }
    _ps.addComment(newComment)
    form.reset()
  }

  addSubComment(event, id) {

    event.preventDefault();
    let form = event.target
    let newComment = {
      username: form.username.value,
      description: form.description.value,
      url: form.url.value,
      commentId: id
    }
    _ps.addSubComment(newComment)
    form.reset()
    // document.getElementById(id + 'subform').setAttribute('hidden', 'true')
  }

  setActivePost(id) {
    _ps.getApiComments(id)
    _ps.setActivePost(id)
  }
  drawComment() {
    let template = ''
    let comment = _ps.Comments
    comment.forEach(c => {

    })
  }


  drawHome() {
    draw()
  }

  upVote(id) {
    _ps.upVote(id)
  }

  downVote(id) {
    _ps.downVote(id)
  }

  commentVote(id, num) {
    _ps.commentVote(id, num)
  }

  deleteComment(id) {
    _ps.deleteComment(id)

  }

  deleteSubComment(parentId, id) {
    _ps.deleteSubComment(parentId, id)
  }

  editPost(event, id) {
    event.preventDefault();
    let form = event.target
    let newPost = {
      title: form.title.value,
      username: form.username.value,
      description: form.description.value,
      img: form.img.value
    }
    _ps.editPost(newPost)
    form.reset()
  }
  refresh() {
    _ps.setActivePost(_ps.ActivePost._id)
  }

  subCommentVote(parentId, Id, num) {
    _ps.subCommentVote(parentId, Id, num)
  }
}
