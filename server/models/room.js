
var mongoose = require('mongoose'),
	autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(mongoose.connection)

const roomSchema = new mongoose.Schema({
	name: String,
	creator: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'
	},
	game: String,
	platform: String,
	description: String
}, { timestamps: true })

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
roomMemberSchema.plugin(autoIncrement.plugin, { model: 'Room_Member', field: 'seq' })

const roomScheduleSchema = new mongoose.Schema({
	roomId: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Room'
	},
	fromDate: Date,
	toDate: Date
})
roomScheduleSchema.plugin(autoIncrement.plugin, { model: 'Room_Schedule', field: 'seq' })

const roomAnnouncementsSchema = new mongoose.Schema({
	roomId: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Room'
	},
	message: String
})
roomAnnouncementsSchema.plugin(autoIncrement.plugin, { model: 'Room_Announcement', field: 'seq' })

module.exports = {
	Room: mongoose.model('Room', roomSchema),
	RoomMember: mongoose.model('Room_Member', roomMemberSchema),
	RoomSchedule: mongoose.model('Room_Schedule', roomScheduleSchema),
	RoomAnnouncement: mongoose.model('Room_Announcement', roomAnnouncementsSchema)
}