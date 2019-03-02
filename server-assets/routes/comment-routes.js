let Comments = require('../models/comment')
let router = require('express').Router()
let Subcomments = require('../models/subComment')

//only for testing

router.get('', (req, res, next) => {
  Comments.find({})
    .then(comments => res.send(comments))
    .catch(err => res.status(400).send(err))
})


router.get('/:id', (req, res, next) => {
  Comments.findById(req.params.id)
    .then(comments => res.send(comments))
})

router.get('/:id/subComment', (req, res, next) => {
  Comments.findById({ subComment: req.params.id })
    .then(subcomment => res.send(subcomment))
    .catch(err => res.status(400).send(err))
})

router.post('', (req, res, next) => {
  Comments.create(req.body)
    .then(comment => res.send(comment))
    .catch(err => res.status(400).send(err))
})


router.put('/:id', async (req, res, next) => {
  try {
    let comment = await Comments.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(comment)
  } catch (err) {
    res.status(400).send(err)
  }
})


router.delete('/:id', (req, res, next) => {
  Comments.findById(req.params.id)
    .then(post => post.remove())
    .then(() => res.send('THIS POST WAS BOTTOM TO TOP'))
    .catch(err => res.status(400).send(err))
})

//Subcomments

//Create SubComment
router.post('/:commentId/subComments', (req, res, next) => {
  // SubComments.create(req.body)
  //   .then(subComments => res.send(subComments))
  //   .catch(err => res.status(400).send(err))
  Comments.findById(req.params.commentId)
    .then(comment => {
      comment.subComments.push(req.body)
      comment.save(err => {
        if (err) {
          res.status(400).send(err)
        }
        res.status(201).send(comment)
      })
    })
})

//Edit Subcomment
router.put('/:commentId/subComments/:id', async (req, res, next) => {
  Comments.findById(req.params.commentId)
    .then(comment => {
      let subcomment = comment.subComments.id(req.params.id)
      comment.subComments.splice(comment.subComments.indexOf(subcomment), 1, req.body)
      comment.save(err => {
        if (err) {
          res.status(400).send(err)
        }
        res.status(201).send(comment)
      })
    })
})

//delete subcomment
router.delete('/:commentId/subComments/:id', (req, res, next) => {
  Comments.findById(req.params.commentId)
    .then(comment => {
      comment.subComments.id(req.params.id).remove()
      comment.save(err => {
        if (err) {
          res.status(400).send(err)
        }
        res.status(201).send(comment)
      })
    })
})

module.exports = { router }