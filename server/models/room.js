
var mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
	name: String,
	creator: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'
	},
	game: String,
	platform: String,
	status: String
})

const roomMemberSchema = new mongoose.Schema({
	userId: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'
	},
	roomId: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Room'
	}
})

module.exports = {
	Room: mongoose.model('Room', roomSchema),
	RoomMember: mongoose.model('Room_Member', roomMemberSchema)
}