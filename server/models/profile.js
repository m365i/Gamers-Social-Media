
var mongoose = require('mongoose')

const CountrySchema = new mongoose.Schema({
	capital: String,
	code: String,
	latlng: [{ type: Number }],
	name: String,
	region: String
})



const profileSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		unique: true
	},
	name: String,
	birth: Date,
	country: { type: CountrySchema },
	status: String,
	email: {
		type: String,
		unique: true
	},
	friends: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	platform: String,
	game: String,

})

module.exports = mongoose.model('Profile', profileSchema)