var express = require('express')
var router = express.Router()

var { random, autoComplete, info } = require('../controllers/games')

router.get('/random', random)
router.get('/autoComplete', autoComplete)
router.get('/info', info)

module.exports = router