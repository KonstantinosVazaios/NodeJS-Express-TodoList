const express = require('express')
const app = express();

require('dotenv').config()
require('./startup/routes')(app);
require('./startup/db')();

app.listen(3000, () => {console.log(`Listening on port ${process.env.PORT}`)})

app.get('/', (req, res) => {
    return res.send({"message": "TODOS APP WITH JWT AUTHENTICATION"})
})