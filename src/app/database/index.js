const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://deploy:befluent@cluster0-egar9.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

module.exports = mongoose