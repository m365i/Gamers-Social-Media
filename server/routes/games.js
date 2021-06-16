var express = require('express')
var router = express.Router()

var { cover, random, autoComplete, info } = require('../controllers/games')

router.get('/random', random)
router.get('/autoComplete', autoComplete)
router.get('/info', info)
router.get('/cover/:name', cover)

module.exports = router