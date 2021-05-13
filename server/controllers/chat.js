
var mongoose = require('mongoose')
var Chat = require('../models/chat')
var {Room, RoomMember} = require('../models/room')

module.exports = (io) => {

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