var express = require('express')
var router = express.Router()

var { contact } = require('../controllers/contact')

router.post('/', contact)

module.exports = router