var express = require('express')
var router = express.Router()

var authRouter = require('./auth')
var contactRouter = require('./contact')
var gamesRouter = require('./games')

router.use('/auth', authRouter)
router.use('/contact', contactRouter)
router.use('/games', gamesRouter)

module.exports = router
