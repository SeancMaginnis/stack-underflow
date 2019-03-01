import PostController from "./components/post/postController.js";
// import CommentController from "";
// import SubCommentController from "";

class App {
  constructor() {
    this.controllers = {
      postController: new PostController()
      //controllers go here
    }
  }
}

// @ts-ignore
window.app = new App()