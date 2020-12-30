const mongoose = require('mongoose')
const User = require('./users')

var noteSchema = new mongoose.Schema(
	{
	title: {
		type: String,
		require: true
	},
	content: {
		type: String,
		required: true,
		maxLength: 500
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	
	},
	{
	timestamps: true
	}
)

noteSchema.pre('remove', async function(next) {
	try {
		let user = await User.findById(this.user)
		user.notes.remove(this.id)
		await user.save()
		return next()
	} catch(err) {
		return next(err)
	}
})

const Note = mongoose.model('Note', noteSchema)
module.exports = Note