const router = require('express').Router()
const Chat = require('../models/chatModel')
const Message = require('../models/messageModel')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/new-message', authMiddleware, async (req, res) => {
    try {
        const newMessage = new Message(req.body)
        const savedMessage = await newMessage.save()

        // const chat = await Chat.findById(req.body.chat)
        // chat.lastMessage = savedMessage._id
        // await chat.save()

        const chat = await Chat.findOneAndUpdate(
            { _id: req.body.chat},
            {
                lastMessage: savedMessage._id,
                $inc: { unreadMessages: 1},
            }
        )
        res.send({
            success: true,
            message: 'message sent successfully',
            data: savedMessage
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message,
        })
    }
})

router.get('/get-all-messages/:chatId', async (req, res) => {
    try {
        const messages = await Message.find({
            chat: req.params.chatId,
        }).sort({ createdAt: 1})

        res.send({
            success: true,
            message: 'messages fetched successfully',
            data: messages
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message,
        })
    }
})

module.exports = router