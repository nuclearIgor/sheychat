const User = require('../models/userModel')
const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/register', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.send({
                message: 'user already exists',
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashedPassword

        const newUser = new User(req.body)
        await newUser.save()
        res.json({
            message: 'user created successfully',
            success: true,
            user: newUser
        })



    } catch (e) {
        res.send({
            message: e.message,
            success: false
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            return res.send({
                message: "user does not exist",
                success: false
            })
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res.send({
                message: "invalid password",
                success: false
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
        return res.send({
            message: "user logged in successfully",
            success: true,
            token: token
        })

    } catch (e) {
        res.send({
            message: e.message,
            success: false
        })
    }
})

router.get('/currentuser', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId })
        delete user.password

        res.send({
            success: true,
            message: "user fetched successfully",
            data: user
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message,
        })
    }
})

router.get('/get-all-users', authMiddleware, async (req, res) => {
    try {
        const allUsers = await User.find({ _id: { $ne: req.body.userId }})
        res.send({
            success: true,
            message: 'users fetched successfully',
            data: allUsers
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message,
        })
    }
})


module.exports = router