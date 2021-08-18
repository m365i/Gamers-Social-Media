
var express = require('express')
var router = express.Router()

const profile_friends_controller = require('../controllers/profile_friends_controller')

router.put('/add_friend', profile_friends_controller.AddFriend)

router.post('/delete_friend', profile_friends_controller.DeleteFriend)



module.exports = router