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

const server = require("http").createServer(app)
const io  = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

// check the connection
io.on('connection', (socket) => {
    socket.on('join-room', (userId) => {
        socket.join(userId)
    })

    // send message to clients in the members array
    socket.on('send-message', (message) => {
        console.log(message)
        io.to(message.members[0]).to(message.members[1])
            .emit("receive-message", message)
    })
    // console.log('connected with id: ', socket.id)
})


server.listen(port, () => {
    console.log(`listening on ${port}`)
})