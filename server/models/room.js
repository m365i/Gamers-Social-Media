
var mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
	name: String,
	creator: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'
	},
	game: String,
	platform: String,
	description: String
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

const roomScheduleSchema = new mongoose.Schema({
	roomId: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Room'
	},
	fromDate: Date,
	toDate: Date
})

const roomAnnouncementsSchema = new mongoose.Schema({
	roomId: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Room'
	},
	text: String
})

module.exports = {
	Room: mongoose.model('Room', roomSchema),
	RoomMember: mongoose.model('Room_Member', roomMemberSchema),
	RoomSchedule: mongoose.model('Room_Schedule', roomScheduleSchema),
	RoomAnnouncement: mongoose.model('Room_Announcement', roomAnnouncementsSchema)
}