const express = require('express')
require('dotenv').config()
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())
dbConfig = require('./config/dbConfig')

const usersRoute = require('./routes/usersRoute')
const chatsRoute = require('./routes/chatsRoute')
const messagesRoute = require('./routes/messagesRoute')

const port = process.env.PORT || 3000

app.use('/api/users', usersRoute)
app.use('/api/chats', chatsRoute)
app.use('/api/messages', messagesRoute)

app.listen(port, () => {
    console.log(`listeing on ${port}`)
})