require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const noteRoutes = require('./routes/notes')
const errorHandler = require('./handlers/error')
const { loginRequired, isCorrectUser } = require('./middleware/auth')
const db = require('./models')

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

// app.get("/api/notes", async function(req, res, next){
// 	try {
// 		let notes = await db.Note.find()
// 		.sort({ createdAt: "desc" })
// 		.populate("user")
// 		return res.status(200).json(notes)
// 	} catch (err) {
// 		return next(err)
// 	}
// })

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
