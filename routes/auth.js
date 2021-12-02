const express = require('express')
const router = express.Router()
const {User, validate} = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req,res) => {
    const {error} = validate(req.body)
    if (error) return res.send(error)

    const emailExists = await User.findOne({email: req.body.email})
    if (emailExists) return res.send({"message": "Email already exists"})

    const salt = await bcrypt.genSalt(10)
    const hashedPwd = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        email: req.body.email,
        password: hashedPwd
    })

    try {
        await user.save()
        return res.send({"message": "Registration Successful"})
    } catch(err) {
        return res.status(500).send({"message": "Something went wrong"})
    }
})

router.post('/login', async (req,res) => {
    const {error} = validate(req.body)
    if (error) return res.send(error)
    
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send({"message": "The email or the password is invalid"})

    const validPwd = await bcrypt.compare(req.body.password, user.password)
    if (!validPwd) return res.status(400).send({"message": "The email or the password is invalid"})

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({"token": token})
})

module.exports = router