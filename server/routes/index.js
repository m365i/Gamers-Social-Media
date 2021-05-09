var express = require('express')
var router = express.Router()

var authRouter = require('./auth')
var contactRouter = require('./contact')

router.use('/auth', authRouter)
router.use('/contact', contactRouter)

module.exports = router
