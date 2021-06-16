
const {StatusCodes} = require('http-status-codes')
var { gameCover, getGame, autoComplete, randomGames } = require('../util/games')

exports.random = async function (req, res, next) {
	res.status(StatusCodes.OK).send(randomGames())
}

exports.autoComplete = async function (req, res, next) {
	const { name } = req.query
	if(!name) {
		return res.status(StatusCodes.BAD_REQUEST).send('game name is missing')
	}
	res.status(StatusCodes.OK).send(autoComplete(decodeURI(name)))
}

exports.info = async function (req, res, next) {
	const { name } = req.query
	if(!name) {
		return res.status(StatusCodes.BAD_REQUEST).send('game name is missing')
	}
	const game = getGame(decodeURI(name))
	if(!game) {
		return res.sendStatus(StatusCodes.NOT_FOUND)
	}
	res.status(StatusCodes.OK).send(game)
}

exports.cover = async function (req, res, next) {
	const { name } = req.params
	if(!name) {
		return res.status(StatusCodes.BAD_REQUEST).send('game name is missing')
	}
	const cover = gameCover(decodeURI(name))
	if(!cover) {
		return res.sendStatus(StatusCodes.NOT_FOUND)
	}
	res.status(StatusCodes.OK).sendFile(cover)
}