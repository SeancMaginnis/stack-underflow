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
  Comments.findByIdAndDelete(req.params.id)
    .then(() => res.send('CENSORSHIP'))
    .catch(err => res.status(400).send(err))
})




module.exports = { router }