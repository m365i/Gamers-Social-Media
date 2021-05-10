
var fs = require('fs')
var path = require('path')

let steam = require(path.join(__dirname, 'steam.json'))

// get a game by its name
exports.getGame = function(name) {
	let result = steam.find((game) => game.name === name)
	result.image = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, 'images/' + result.appid + '.jpg'), 'base64')
	return result
}

// get 5 games that their name starts with the name givin
exports.autoComplete = function(name) {
	return steam.filter((game) => game.name.startsWith(name)).split(0, 5)
}
