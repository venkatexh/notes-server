const mongoose = require('mongoose')


//const uri = `mongodb+srv://venkatesh:${pwd}@mycluster.fyzgz.mongodb.net/notes-db?retryWrites=true&w=majority`

mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})

module.exports.User = require('./users')
module.exports.Note = require('./notes')
