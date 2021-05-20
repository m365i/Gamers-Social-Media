
var express = require('express')
var router = express.Router()
var {ensureLoggedIn} = require('../util/ensureAuth')

var { 
	my, list, select, create, edit, remove, 
	isMember, listMembers, addMember, removeMember, roomExistMiddleware, userIsRoomMemberMiddleware, userIsNotRoomMemberMiddleware, 
	listAnnouncements, addAnnouncement, removeAnnouncement, userIsRoomOwnerMiddleware, userIsNotRoomOwnerMiddleware, 
	listSchedules, addSchedule, removeSchedule 
} = require('../controllers/room')

router.get('/my', my)
router.get('/list', list)
router.get('/', select)
router.post('/', ensureLoggedIn(), create)
router.put('/', ensureLoggedIn(), edit)
router.delete('/', ensureLoggedIn(), remove)
router.get('/is-member', roomExistMiddleware, userIsRoomMemberMiddleware, isMember)
router.get('/members', roomExistMiddleware, listMembers)
router.post('/members', ensureLoggedIn(), roomExistMiddleware, userIsNotRoomMemberMiddleware, addMember)
router.delete('/members', ensureLoggedIn(), roomExistMiddleware, userIsRoomMemberMiddleware, userIsNotRoomOwnerMiddleware, removeMember)
router.get('/announcements', roomExistMiddleware, listAnnouncements)
router.post('/announcements', ensureLoggedIn(), roomExistMiddleware, userIsRoomMemberMiddleware, userIsRoomOwnerMiddleware, addAnnouncement)
router.delete('/announcements', ensureLoggedIn(), roomExistMiddleware, userIsRoomMemberMiddleware, userIsRoomOwnerMiddleware, removeAnnouncement)
router.get('/schedule', roomExistMiddleware, listSchedules)
router.post('/schedule', ensureLoggedIn(), roomExistMiddleware, userIsRoomMemberMiddleware, userIsRoomOwnerMiddleware, addSchedule)
router.delete('/schedule', ensureLoggedIn(), roomExistMiddleware, userIsRoomMemberMiddleware, userIsRoomOwnerMiddleware, removeSchedule)

module.exports = router
