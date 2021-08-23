
var express = require('express')
var router = express.Router()

const notification_controller = require('../controllers/notificationController')

router.post('/new_note', notification_controller.create)
router.get('/all_notes', notification_controller.findAll)
router.delete('/delete_note/:NoteId', notification_controller.delete)



module.exports = router