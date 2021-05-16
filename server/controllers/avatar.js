
const {StatusCodes} = require('http-status-codes')
const { usernameAvatar, animalAvatar } = require('../util/avatar')

exports.username = function (req, res, next) {
	const name = req.params.user
	res.sendFile(usernameAvatar(name))
}

exports.animal = function (req, res, next) {
	const name = req.params.animal
	const found = animalAvatar(name)
	if(found) {
		return res.sendFile(animalAvatar(name))
	}
	return res.sendStatus(StatusCodes.NOT_FOUND)
}