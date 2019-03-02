let mongoose = require('mongoose')
let Post = require('./post')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let comment = require('./comment')


let post = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, default: 'See Image' },
  img: { type: String },
  username: { type: String },
  upVote: { type: Number, default: 0 },
  downVote: { type: Number }
}, { timestamps: true })


post.pre("remove", function (next) {
  comment.remove({ post: this._id })
    .then(() => next())
    .catch(err => next(err))
})

module.exports = mongoose.model("Post", post)