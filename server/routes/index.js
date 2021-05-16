var express = require('express')
var router = express.Router()

var authRouter = require('./auth')
var contactRouter = require('./contact')
var gamesRouter = require('./games')
var avatarRouter = require('./avatar')
var roomRouter = require('./room')

router.use('/auth', authRouter)
router.use('/contact', contactRouter)
router.use('/games', gamesRouter)
router.use('/avatar', avatarRouter)
router.use('/room', roomRouter)

module.exports = router
