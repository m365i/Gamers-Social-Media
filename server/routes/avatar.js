
const {Router} = require('express')
const router = Router()

const { username, animal } = require('../controllers/avatar')

router.get('/username/:user', username)
router.get('/animal/:animal', animal)

module.exports = router