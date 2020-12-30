const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

var userSchema = new mongoose.Schema({
	
	email: {
		type: String,
		unique: true,
		required: true
	},
	
	username: {
		type: String,
		unique: true,
		required: true
	},
	
	firstName: {
		type: String,
		required: true
	},
	
	lastName: {
		type: String,
		required: true
	},
	
	password: {
		type: String,
		required: true
	},
	
	notes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Note'
		}
	]
})

userSchema.pre('save', async function(next) {
	try {
		if(!this.isModified("password")) {
			return next()
		}
		let hashedPassword = await bcrypt.hash(this.password, 10)
		this.password = hashedPassword
		return next()
	} catch(err) {
		return next(err)
	}
})

userSchema.methods.comparePassword = async function(candidate, next) {
	try{
		let isMatch = await bcrypt.compare(candidate, this.password)
		return isMatch
	} catch(err) {
		return next(err)
	}
}

const User = mongoose.model('User', userSchema)
module.exports = User





