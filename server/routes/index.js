var express = require('express')
var router = express.Router()

var authRouter = require('./auth')
var contactRouter = require('./contact')
var gamesRouter = require('./games')
var avatarRouter = require('./avatar')
var roomRouter = require('./room')
var searchRouter = require('./search')
var profileRouter = require('./profile_routes')
var ImageUploadRouter = require('./MongoImages')
router.use('/auth', authRouter)
router.use('/contact', contactRouter)
router.use('/games', gamesRouter)
router.use('/avatar', avatarRouter)
router.use('/room', roomRouter)
router.use('/search', searchRouter)
router.use('/profiles', profileRouter)
router.use('/profile/img', ImageUploadRouter)
module.exports = router
