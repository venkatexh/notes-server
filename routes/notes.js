const express = require('express')
const router = express.Router({mergeParams: true})
const { deleteNote, createNote, getNote, updateNote } = require('../handlers/notes')


router.route('/').post(createNote)

router
	.route('/:note_id')
	.get(getNote)
	.delete(deleteNote)
	.put(updateNote)

module.exports = router