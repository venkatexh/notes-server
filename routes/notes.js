const express = require('express')
const router = express.Router({mergeParams: true})
const { deleteNote, createNote, getNote } = require('../handlers/notes')


router.route('/').post(createNote)

router
	.route('/:note_id')
	.get(getNote)
	.delete(deleteNote)

module.exports = router