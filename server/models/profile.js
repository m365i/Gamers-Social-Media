
var mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	name: String,
	birth: Date,
	country: String,
	status: String,
	email: String,
	friends: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	]
})

module.exports = mongoose.model('Profile', profileSchema)