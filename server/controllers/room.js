
const {StatusCodes} = require('http-status-codes')
var mongoose = require('mongoose')
var Chat = require('../models/chat')
var {Room, RoomMember, RoomSchedule, RoomAnnouncement} = require('../models/room')
var User = require('../models/user')
var Joi = require('joi')
const {hasGame} = require('../util/games')

exports.listSchedules = async function (req, res, next) {
	const {roomId} = req.query
	// get list of schedule
	const schedules = await RoomSchedule.find({ roomId: new mongoose.Types.ObjectId(roomId) })
		.sort({seq: 'desc'})
		.exec()
	return res.status(StatusCodes.OK).send(schedules)
}

exports.addSchedule = async function (req, res, next) {
	const {roomId} = req.query
	const {fromDate, toDate} = req.body
	// add schedule to room
	const schedule = new RoomSchedule({roomId: new mongoose.Types.ObjectId(roomId), fromDate, toDate})
	await schedule.save()
	return res.sendStatus(StatusCodes.OK)
}

exports.removeSchedule = async function (req, res, next) {
	const {scheduleId} = req.body
	// remove schedule from room
	if((await RoomSchedule.deleteOne({_id: scheduleId}).exec()).n !== 1) {
		return res.status(StatusCodes.BAD_REQUEST).send('schedule dose not exist')
	}
	return res.sendStatus(StatusCodes.OK)
}

// should be used in conjecture with userIsRoomMemberMiddleware
exports.userIsNotRoomOwnerMiddleware = async function (req, res, next) {
	const userId = req.user.id
	const {roomId} = req.query
	let exist
	try {
		exist = await Room.exists({creator: new mongoose.Types.ObjectId(userId), _id: new mongoose.Types.ObjectId(roomId)})
	} catch(err) {
		exist = false
	}
	if(exist) {
		return res.status(StatusCodes.FORBIDDEN).send('user is the owner of this room')
	}
	next()
}

// should be used in conjecture with userIsRoomMemberMiddleware
exports.userIsRoomOwnerMiddleware = async function (req, res, next) {
	const userId = req.user.id
	const {roomId} = req.query
	let exist
	try {
		exist = await Room.exists({creator: new mongoose.Types.ObjectId(userId), _id: new mongoose.Types.ObjectId(roomId)})
	} catch(err) {
		exist = false
	}
	if(!exist) {
		return res.status(StatusCodes.FORBIDDEN).send('user is not the owner of this room')
	}
	next()
}

exports.listAnnouncements = async function (req, res, next) {
	const {roomId} = req.query
	// get list of announcement
	const announcements = await RoomAnnouncement.find({ roomId: new mongoose.Types.ObjectId(roomId) })
		.sort({seq: 'desc'})
		.exec()
	return res.status(StatusCodes.OK).send(announcements)
}

exports.addAnnouncement = async function (req, res, next) {
	const {roomId} = req.query
	const {message} = req.body
	// add announcement to room
	const announcement = new RoomAnnouncement({roomId: new mongoose.Types.ObjectId(roomId), message})
	await announcement.save()
	return res.sendStatus(StatusCodes.OK)
}

exports.removeAnnouncement = async function (req, res, next) {
	const {announcementId} = req.body
	// remove announcement from room
	if((await RoomAnnouncement.deleteOne({_id: announcementId}).exec()).n !== 1) {
		return res.status(StatusCodes.BAD_REQUEST).send('announcement dose not exist')
	}
	return res.sendStatus(StatusCodes.OK)
}

exports.roomExistMiddleware = async function (req, res, next) {
	const {roomId} = req.query
	if(!roomId) {
		return res.status(StatusCodes.BAD_REQUEST).send('no specified room id')
	}
	let exist
	try {
		exist = await Room.exists({ _id: new mongoose.Types.ObjectId(roomId) })
	} catch(err) {
		exist = false
	}
	if(!exist) {
		return res.status(StatusCodes.BAD_REQUEST).send('room not found')
	}
	next()
}

// should be used in conjecture with roomExistMiddleware
exports.userIsRoomMemberMiddleware = async function (req, res, next) {
	const userId = req.user.id
	const {roomId} = req.query
	let exist
	try {
		exist = await RoomMember.exists({userId: new mongoose.Types.ObjectId(userId), roomId: new mongoose.Types.ObjectId(roomId)})
	} catch(err) {
		exist = false
	}
	if(!exist) {
		return res.status(StatusCodes.FORBIDDEN).send('user is not a member of this room')
	}
	next()
}

// should be used in conjecture with roomExistMiddleware
exports.userIsNotRoomMemberMiddleware = async function (req, res, next) {
	const userId = req.user.id
	const {roomId} = req.query
	let exist
	try {
		exist = await RoomMember.exists({userId: new mongoose.Types.ObjectId(userId), roomId: new mongoose.Types.ObjectId(roomId)})
	} catch(err) {
		exist = false
	}
	if(exist) {
		return res.status(StatusCodes.FORBIDDEN).send('user is a member of this room')
	}
	next()
}

exports.isMember = async function (req, res, next) {
	return res.sendStatus(StatusCodes.OK)
}

exports.listMembers = async function (req, res, next) {
	const {roomId} = req.query
	// get list of members
	let members = await RoomMember.aggregate()
		.match({
			roomId: new mongoose.Types.ObjectId(roomId)
		})
		.lookup({
			from: 'profiles',
			localField: 'userId',
			foreignField: 'userId',
			as: 'profile'
		})
		.sort({seq: 'desc'})
		.exec()
	members = members.map(m => {
		return {
			name: m.profile[0].name,
			image: m.profile[0].image || (process.env.SERVER_URL + '/api/avatar/username/' + m.profile[0].name),
			userId: m.userId
		}
	})
	return res.status(StatusCodes.OK).send(members)
}

exports.addMember = async function (req, res, next) {
	const userId = req.user.id
	const {roomId} = req.query
	// add member to room
	const member = new RoomMember({userId: new mongoose.Types.ObjectId(userId), roomId: new mongoose.Types.ObjectId(roomId)})
	await member.save()
	return res.sendStatus(StatusCodes.OK)
}

exports.removeMember = async function (req, res, next) {
	const userId = req.user.id
	const {roomId} = req.query
	// remove member from room
	await RoomMember.deleteOne({userId: new mongoose.Types.ObjectId(userId), roomId: new mongoose.Types.ObjectId(roomId)}).exec()
	return res.sendStatus(StatusCodes.OK)
}

exports.my = async function (req, res, next) {
	let {userId} = req.query
	if(userId) {
		// check if user exist
		let exist
		try {
			exist = await User.exists({ _id: new mongoose.Types.ObjectId(userId) })
		} catch(err) {
			exist = false
		}
		if(!exist) {
			return res.status(StatusCodes.BAD_REQUEST).send('user not found')
		}
	} else {
		userId = req.user ? req.user.id : undefined
		// check if user logged in
		if(!userId) {
			return res.status(StatusCodes.BAD_REQUEST).send('no specified user id')
		}
	}
	// get list of rooms
	const rooms = await RoomMember.find({ userId: new mongoose.Types.ObjectId(userId) }).populate('roomId').exec()
	return res.status(StatusCodes.OK).send(rooms.map(r => r.roomId))
}

exports.list = async function (req, res, next) {
	let {userId} = req.query
	if(userId) {
		// check if user exist
		let exist
		try {
			exist = await User.exists({ _id: new mongoose.Types.ObjectId(userId) })
		} catch(err) {
			exist = false
		}
		if(!exist) {
			return res.status(StatusCodes.BAD_REQUEST).send('user not found')
		}
	} else {
		userId = req.user ? req.user.id : undefined
		// check if user logged in
		if(!userId) {
			return res.status(StatusCodes.BAD_REQUEST).send('no specified user id')
		}
	}
	// get list of rooms
	const rooms = await Room.find({ creator: new mongoose.Types.ObjectId(userId) }).exec()
	return res.status(StatusCodes.OK).send(rooms)
}

exports.select = async function (req, res, next) {
	const {roomId} = req.query
	if(roomId) {
		let room
		try {
			room = await Room.findById(roomId)
		} catch(err) { 
			// handle error later
		}
		if(!room) {
			return res.status(StatusCodes.BAD_REQUEST).send('room not found')
		}
		return res.status(StatusCodes.OK).send(room)
	}
	return res.status(StatusCodes.BAD_REQUEST).send('no specified room id')
}

exports.create = async function (req, res, next) {
	const userId = req.user.id
	let {name, game, platform, description} = req.body
	// validate input
	try {
		const name_validator = Joi.string().min(3).max(64).pattern(/^[a-zA-Z0-9][a-zA-Z0-9 -_'+]+$/)
		Joi.attempt(name, name_validator)
		if(!hasGame(game)) {
			throw new Error('game not found')
		}
		const platform_validator = Joi.string().pattern(/^Pc|Xbox|Playstation|Android|Apple|Psp$/)
		Joi.attempt(platform, platform_validator)
		if(!description) {
			description = ''
		} else {
			const description_validator = Joi.string().max(256)
			Joi.attempt(description, description_validator)
		}
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).send('name, game, platform or description are not formatted correctly')
	}
	// create room
	let room = new Room({name, creator: new mongoose.Types.ObjectId(userId), game, platform, description})
	room = await room.save()
	// add creator as a member to the room
	const member = new RoomMember({roomId: room._id, userId: new mongoose.Types.ObjectId(userId)})
	await member.save()
	res.status(StatusCodes.OK).send(room._id)
}

exports.edit = async function (req, res, next) {
	const userId = req.user.id
	const {roomId} = req.query
	const {name, game, platform, description} = req.body
	// make sure the user is the owner of the room
	let exist
	try {
		exist = await Room.exists({ _id: new mongoose.Types.ObjectId(roomId), creator: new mongoose.Types.ObjectId(userId) })
	} catch(err) { 
		// handle error later
	}
	if(!exist) {
		return res.status(StatusCodes.FORBIDDEN).send('room dose not exist or user have no permisision to delete it')
	}
	// validate input
	let update = {}
	try {
		if(name) {
			const name_validator = Joi.string().min(3).max(64).pattern(/^[a-zA-Z0-9][a-zA-Z0-9 -_'+]+$/)
			Joi.attempt(name, name_validator)
			update.name = name
		}
		if(game) {
			if(!hasGame(game)) {
				throw new Error('game not found')
			}
			update.game = game
		}
		if(platform) {
			const platform_validator = Joi.string().pattern(/^Pc|Xbox|Playstation|Android|Apple|Psp$/)
			Joi.attempt(platform, platform_validator)
			update.platform = platform
		}
		if(description) {
			const description_validator = Joi.string().max(256)
			Joi.attempt(description, description_validator)
			update.description = description
		}
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).send('name, game, platform or description are not formatted correctly')
	}
	// make changes
	await Room.updateOne({ _id: new mongoose.Types.ObjectId(roomId) }, update).exec()
	return res.sendStatus(StatusCodes.OK)
}

exports.remove = async function (req, res, next) {
	const userId = req.user.id
	const {roomId} = req.query
	// make sure the user is the owner of the room
	let exist
	try {
		exist = await Room.exists({ _id: new mongoose.Types.ObjectId(roomId), creator: new mongoose.Types.ObjectId(userId) })
	} catch(err) { 
		// handle error later
	}
	if(!exist) {
		return res.status(StatusCodes.FORBIDDEN).send('room dose not exist or user have no permisision to delete it')
	}
	// delete room
	await Room.deleteOne({ _id: new mongoose.Types.ObjectId(roomId) }).exec()
	await RoomMember.deleteMany({ roomId: new mongoose.Types.ObjectId(roomId) }).exec()
	await RoomSchedule.deleteMany({ roomId: new mongoose.Types.ObjectId(roomId) }).exec()
	await RoomAnnouncement.deleteMany({ roomId: new mongoose.Types.ObjectId(roomId) }).exec()
	await Chat.deleteMany({ to: new mongoose.Types.ObjectId(roomId) }).exec()
	return res.sendStatus(StatusCodes.OK)
}

exports.chat = (io) => {

	function messagesChatInfo(msgs) {
		if(!msgs) {
			return []
		}
		return msgs.map(m => {
			return {
				name: m.profile[0].name,
				image: m.profile[0].image || (process.env.SERVER_URL + '/api/avatar/username/' + m.profile[0].name),
				message: m.message,
				userId: m.from,
				seq: m.seq,
				time: m.createdAt,
				id: m._id
			}
		})
	}

	io.on('connection', async (socket) => {
		const userId = socket.request.user ? socket.request.user.id : undefined
		const roomId = socket.handshake.query.room

		let exist, permisision = false
		try {
			// check if room exist
			exist = await Room.exists({ _id: new mongoose.Types.ObjectId(roomId) })
			// check if user have permisision to use room
			permisision = await RoomMember.exists({ userId: new mongoose.Types.ObjectId(userId), roomId: new mongoose.Types.ObjectId(roomId) })
		} catch(err) { 
			// handle error later
		}
		if(!exist) {
			socket.disconnect()
			return
		}
		socket.join(roomId)

		// send last 10 messages
		const msgs = await Chat.aggregate()
			.match({
				to: new mongoose.Types.ObjectId(roomId)
			}).lookup({
				from: 'profiles',
				localField: 'from',
				foreignField: 'userId',
				as: 'profile'
			})
			.sort({seq: 'desc'})
			.limit(20)
			.exec()
		socket.emit('message', messagesChatInfo(msgs))

		// recive message
		if(permisision) {
			socket.emit('status', 'allowed to chat')
			socket.on('message', async (msg) => {
				// save message in database
				msg = new Chat({message: msg, from: new mongoose.Types.ObjectId(userId), to:  new mongoose.Types.ObjectId(roomId)})
				msg = await msg.save()
				msg = await Chat.aggregate()
					.match({
						_id: new mongoose.Types.ObjectId(msg._id)
					}).lookup({
						from: 'profiles',
						localField: 'from',
						foreignField: 'userId',
						as: 'profile'
					})
					.exec()
				// send message to all listeners
				io.to(roomId).emit('message', messagesChatInfo(msg))
			})
		} else {
			socket.emit('status', 'not allowed to chat')
		}

		socket.on('more', async (index) => {
			// send more messages to this client from index
			const msgs = await Chat.aggregate()
				.match({
					seq: {$lt: index},
					to: new mongoose.Types.ObjectId(roomId)
				}).lookup({
					from: 'profiles',
					localField: 'from',
					foreignField: 'userId',
					as: 'profile'
				})
				.sort({seq: 'desc'})
				.limit(20)
				.exec()
			socket.emit('more', messagesChatInfo(msgs))
		})
	})
}