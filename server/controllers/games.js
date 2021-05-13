
const {StatusCodes} = require('http-status-codes')
var { getGame, autoComplete, randomGames } = require('../util/games')

exports.random = async function (req, res, next) {
	res.status(200).send(randomGames())
}

exports.autoComplete = async function (req, res, next) {
	const { name } = req.query
	if(!name) {
		return res.status(StatusCodes.BAD_REQUEST).send('game name is missing')
	}
	res.status(200).send(autoComplete(name))
}

exports.info = async function (req, res, next) {
	const { name } = req.query
	if(!name) {
		return res.status(StatusCodes.BAD_REQUEST).send('game name is missing')
	}
	const game = getGame(name)
	if(!game) {
		return res.sendStatus(StatusCodes.NOT_FOUND)
	}
	res.status(200).send(game)
}