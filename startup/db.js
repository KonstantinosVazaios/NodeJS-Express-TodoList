const mongoose = require('mongoose')

module.exports = function() {
    mongoose.connect(`${process.env.DB_CONNECT}`, {useNewUrlParser: true})
      .then(() => console.log("Connected to MongoDB"))
      .catch(err => console.log(err))
  }