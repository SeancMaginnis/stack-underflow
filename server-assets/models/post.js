let mongoose = require('mongoose')
let Post = require('./post')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let Comment = require('./comment')


let post = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  img: { type: String },
  username: { type: String },
  upVote: { type: Number, default: 0, required: true },
  downVote: { type: Number, default: 0, required: true }
}, { timestamps: true })


post.pre("remove", function (next) {
  Comment.deleteMany({ post: this._id })
    .then(() => next())
    .catch(err => next(err))
})

module.exports = mongoose.model("Post", post)