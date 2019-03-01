let mongoose = require('mongoose')


const connectionString = 'mongodb://teamdiscovery:teamd**@den1.mongo1.gear.host:27001/teamdiscovery'

let connection = mongoose.connection

mongoose.connect(connectionString, {
  useNewUrlParser: true
})

connection.on('error', err => {
  console.log('[DATABASE ERROR]', err)
})


connection.once('open', () => {
  console.log('Success connected to database')
})