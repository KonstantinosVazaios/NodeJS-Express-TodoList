const mongoose = require('mongoose')
const Joi = require('joi');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true, 
        min: 8,
        max: 255
    },
    todos: [{ 
        type: Schema.Types.ObjectId, ref: 'Todo' 
    }],
    date: {
        type: Date,
        default: Date.now
    }
})


function validateUser (payload) {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .min(8)
            .max(255)
            .required(),
    
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .min(8)
    })
    return schema.validate(payload)
}

exports.User = mongoose.model('User', userSchema)
exports.validate = validateUser