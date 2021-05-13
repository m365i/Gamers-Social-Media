var express = require('express')
var router = express.Router()

var { contact, all, acknowledge } = require('../controllers/contact')

router.get('/all', all)
router.get('/acknowledge', acknowledge)
router.post('/', contact)

module.exports = router