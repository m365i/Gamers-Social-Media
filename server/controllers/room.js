
const {StatusCodes} = require('http-status-codes')
var mongoose = require('mongoose')
var Chat = require('../models/chat')
var {Room, RoomMember, RoomSchedule, RoomAnnouncement} = require('../models/room')
var User = require('../models/user')
var Joi = require('joi')
const {hasGame} = require('../util/games')

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
	const {name, game, platform, description} = req.body
	// validate input
	try {
		const name_validator = Joi.string().min(3).max(64).pattern(/^[a-zA-Z0-9][a-zA-Z0-9 -_'+]+$/)
		Joi.attempt(name, name_validator)
		if(!hasGame(game)) {
			throw new Error('game not found')
		}
		const platform_validator = Joi.string().pattern(/^pc|xbox|playstation|android|ios|psp$/)
		Joi.attempt(platform, platform_validator)
		const description_validator = Joi.string().max(256)
		Joi.attempt(description, description_validator)
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).send('name, game, platform or description are not formatted correctly')
	}
	// create room
	let room = new Room({name, creator: new mongoose.Types.ObjectId(userId), game, platform, description})
	room = await room.save()
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
			const platform_validator = Joi.string().pattern(/^pc|xbox|playstation|android|ios|psp$/)
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
			return undefined
		}
		return msgs.map(m => {
			return {
				name: m.profile[0].name,
				image: m.profile[0].image,
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
					seq: {$lt: index}
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