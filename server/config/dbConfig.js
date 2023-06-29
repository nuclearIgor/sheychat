const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)

const db = mongoose.connection

db.on('connected', () => {
    console.log('connection succesfull')
})

db.on('error', () => {
    console.log('connection failed')
})

module.exports = db