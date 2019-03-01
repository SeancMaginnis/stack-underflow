let SubComments = require('../models/subComment')
let Comments = require('../models/comment')
let router = require('express').Router()

router.get('/:id', (req, res, next) => {
  SubComments.findById(req.params.id)
    .then(subComments => res.send(subComments))
    .catch(err => res.status(400).send(err))
})

router.get('/:id/comments', (req, res, next) => {
  Comments.find({ subComment: req.params.id })
    .then(comments => res.send(comments))
    .catch(err => res.status(400).send(err))
})

router.post('', (req, res, next) => {
  SubComments.create(req.body)
    .then(subComments => res.send(subComments))
    .catch(err => res.status(400).send(err))
})

module.exports = { router }