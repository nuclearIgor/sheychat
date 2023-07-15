const router = require('express').Router()
const Chat = require('../models/chatModel')
const Message = require('../models/messageModel')

const authMiddleware = require('../middlewares/authMiddleware')


router.post('/create-new-chat', authMiddleware, async (req, res) => {
    try {
        const newChat = new Chat(req.body)
        const savedChat = await newChat.save()

        await savedChat.populate("members")

        res.status(201).send({
            success: true,
            message: 'chat created successfully',
            data: savedChat
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message,
        })
    }
})

router.get('/get-all-chats', authMiddleware, async (req, res) => {
    try {
        const chats = await Chat.find({ members: {$in: [req.body.userId]}
            }).populate("members").populate("lastMessage").sort({ updatedAt: -1})

        res.send({
            success: true,
            message: 'chat fetched successfully',
            data: chats
        })

    } catch (e) {
        res.send({
            success: false,
            message: e.message,
        })
    }
})

router.post('/clear-unread-messages', authMiddleware, async (req, res) => {
    try {
        // update unread messages in the chat
        const chat = await Chat.findById(req.body.chat)
        if(!chat) {
            return res.send({
                success: false,
                message: "chat not found",
            })
        }

        const updatedChat = await Chat.findByIdAndUpdate(
            req.body.chat,
            {
                unreadMessages: 0,
            },
            { new: true}
        ).populate("members").populate("lastMessage")

        // set read to true in all messages related to this chat
        await Message.updateMany(
            {
                chat: req.body.chat,
                read: false
            },
            {
                read: true
            }
        )

        res.send({
            success: true,
            message: "unread messages cleared successfully",
            data: updatedChat
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message,
        })
    }
})


module.exports = router