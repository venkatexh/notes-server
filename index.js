require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const noteRoutes = require('./routes/notes')
const errorHandler = require('./handlers/error')
const { loginRequired, isCorrectUser } = require('./middleware/auth')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)

app.use(
	'/api/users/:id/notes', 
	loginRequired, 
	isCorrectUser, 
	noteRoutes
)

app.use(function(req, res, next) {
	let error = new Error("Not found!")
	error.status = 400
	next(error)
})

app.use(errorHandler)

const PORT = process.env.PORT ||3001

app.listen(PORT, () => {
	console.log("Server now running..")
})
