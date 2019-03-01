let mongoose = require('mongoose')
let Comment = require('./comment')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let Subcomment = require('./subComment')
let Post = require('./post')



let comment = new Schema({
  username: { type: String, required: true },
  timeStamp: { type: String, required: true },
  post: { type: ObjectId, ref: "Post", virtual: true },
  body: { type: String, required: true }


})

comment.pre("remove", function (next) {
  Subcomment.remove({ comment: this._id })
    .then(() => next())
    .catch(err => next(err))
})

module.exports = mongoose.model("Comment", comment)