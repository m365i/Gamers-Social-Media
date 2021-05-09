
var mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
	userId: String,
	name: String
})

module.exports = mongoose.model('Profile', profileSchema)