const db = require('../models')

exports.createNote = async (req, res, next) => {
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

exports.getNote = async (req, res, next) => {
	try {
		let note = await db.Note.find(req.params.note_id)
		return res.status(200).json(note)
	} catch (err) {
		return next(err)
	}
}

exports.getUserNotes = async (req, res, next) => {
	try {
		let notes = await db.Note.find({ creator: req.params.id })
		return res.status(200).json(notes)
	} catch(err) {
		return next(err)
	}
}

exports.deleteNote = async (req, res, next) => {
	try {
		let foundNote = await db.Note.findByIdAndRemove(req.params.note_id)
		return res.status(200).json(foundNote)
	} catch(err) {
		return next(err)
	}
}

exports.updateNote = async (req, res, next) => {
	try {
		let note = await db.Note.findByIdAndUpdate(req.params.note_id, req.body)
		return res.status(200).json(note)
	} catch(err) {
		return next(err)
	}
}