
let cors = require('cors')
let express = require('express')
let bp = require('body-parser')
let server = express()
let port = 3000

require('./server-assets/db/gearhost-config.js')

server.use(bp.json())
server.use(bp.urlencoded({ extended: true }))
server.use(cors())

//Routes Here
let postRoutes = require('./server-assets/routes/post-routes')
let commentRoutes = require('./server-assets/routes/comment-routes')
let subCommentRoutes = require('./server-assets/routes/subComment-routes')

server.use('/api/posts', postRoutes.router)
server.use('/api/comments', commentRoutes.router)
server.use('/api/subcomments', subCommentRoutes.router)




server.use('*', (req, res, next) => {
  res.status(404).send('No Matching Routes')
})

server.listen(port, () => {
  console.log('SUCCESS!!!', port)

})