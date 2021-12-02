const express = require('express')
const error = require('../middleware/error');
const auth = require('../routes/auth')
const todos = require('../routes/todos')

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/auth', auth)
    app.use('/api/todos', todos)
    app.use(error);
}