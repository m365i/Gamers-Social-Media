
var express = require('express')
var router = express.Router()
var {ensureLoggedIn} = require('../util/ensureAuth')

var { 
	list, select, create, edit, remove, 
	//selectMembers, createMembers, removeMembers, selectAnnouncements, createAnnouncements, removeAnnouncements, selectSchedule, createSchedule, removeSchedule 
} = require('../controllers/room')

router.get('/list', list)
router.get('/', select)
router.post('/', ensureLoggedIn(), create)
router.put('/', ensureLoggedIn(), edit)
router.delete('/', ensureLoggedIn(), remove)
/*
router.get('/members', selectMembers)
router.post('/members', ensureLoggedIn(), createMembers)
router.delete('/members', ensureLoggedIn(), removeMembers)
router.get('/announcements', selectAnnouncements)
router.post('/announcements', ensureLoggedIn(), createAnnouncements)
router.delete('/announcements', ensureLoggedIn(), removeAnnouncements)
router.get('/schedule', selectSchedule)
router.post('/schedule', ensureLoggedIn(), createSchedule)
router.delete('/schedule', ensureLoggedIn(), removeSchedule)
*/
module.exports = router
