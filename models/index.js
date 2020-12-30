const mongoose = require('mongoose')

const pwd = process.env.mongod_pwd
const uri = `mongodb+srv://venkatesh:${pwd}@mycluster.fyzgz.mongodb.net/notes-db?retryWrites=true&w=majority`

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})

module.exports.User = require('./users')
module.exports.Note = require('./notes')
