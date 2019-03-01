let Posts = require('../models/post')
let Comments = require('../models/comment')
let router = require('express').Router()


router.get('', (req, res, next) => {
  Posts.find({})
    .then(post => res.send(post))
    .catch(err => res.status(err))
})

router.get('/:id', (req, res, next) => {
  Posts.findById(req.params.id)
    .then(post => res.send(post))
    .catch(err => res.status(err))
})

router.get('/:id/comments', (req, res, next) => {
  Posts.findById({ comments: req.params.id })
    .then(comments => res.send(comments))
    .catch(err => res.status(400).send(err))
})

router.post('', (req, res, next) => {
  Posts.create(req.body)
    .then(post => res.send(post))
    .catch(err => res.status(err))
})


router.put('/:id', async (req, res, next) => {
  try {
    let post = await Posts.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(post)
  } catch (err) {
    res.status(400).send(err)
  }
})


router.delete('/:id', (req, res, next) => {
  Posts.findByIdAndDelete(req.params.id)
    .then(() => res.send('THIS POST WAS BOTTOM TO TOP'))
    .catch(err => res.status(400).send(err))
})






module.exports = { router }