let mongoose = require('mongoose')
let SubComment = require('./subComment')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let Comment = ('./comment')


let subComment = new Schema({
  username: { type: String, required: true },
  timeStamp: { type: String, required: true },
  comment: { type: ObjectId, ref: "Comment", virtual: true },
  body: { type: String, required: true }


})

module.exports = mongoose.model("SubComment", subComment)