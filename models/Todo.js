const mongoose = require('mongoose')
const Joi = require('joi');

const Schema = mongoose.Schema

const todoSchema = new mongoose.Schema({
    user: { 
        type: Schema.Types.ObjectId, ref: 'User' 
    },
    title: {
        type: String,
        required: true,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
})

function validateTodo (payload) {
    const schema = Joi.object({
        title: Joi.string()
            .max(255)
            .required()
    })
    return schema.validate(payload)
}

exports.Todo = mongoose.model('Todo', todoSchema)
exports.validate = validateTodo