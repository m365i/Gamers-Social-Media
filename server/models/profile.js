
var mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	name: String,
	image: String,
	birth: Date,
	country: String,
	status: String
})

module.exports = mongoose.model('Profile', profileSchema)