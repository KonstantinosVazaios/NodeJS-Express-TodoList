const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

router.get('/', auth, async (req,res) => {
    return res.send({"message": "GET all todos"})
})

router.post('/', auth, async (req,res) => {
    return res.send({"message": "CREATE a todo"})
})

router.get('/:id', auth, async (req,res) => {
    return res.send({"message": `GET todo with id ${req.params.id}`})
})

router.patch('/:id', auth, async (req,res) => {
    return res.send({"message": `UPDATE todo with id ${req.params.id}`})
})

router.delete('/:id', auth, async (req,res) => {
    return res.send({"message": `DELETE todo with id ${req.params.id}`})
})

module.exports = router