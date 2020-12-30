const db = require('../models')

exports.createNote = async function(req, res, next) {
	try {
		let note = await db.Note.create({
			title: req.body.title,
			content: req.body.content,
			creator: req.params.id
		})
		let foundUser = await db.User.findById(req.params.id)
		foundUser.notes.push(note.id)
		await foundUser.save()
		let foundNote = await db.Note.findById(note.id)
		return res.status(200).json(foundNote)
		
	} catch(err) {
		return next(err)
	}
}

exports.getNote = async function(req, res, next) {
	try {
		let note = await db.Note.find(req.params.note_id)
		return res.status(200).json(note)
	} catch (err) {
		return next(err)
	}
}

exports.deleteNote = async function(req, res, next) {
	try {
		let foundNote = await db.Note.findById(req.params.note_id)
		await foundNote.remove()
		return res.status(200).json(foundNote)
	} catch(err) {
		return next(err)
	}
}