
var fs = require('fs')
var path = require('path')
var random = require('random')

let steam = require(path.join(__dirname, 'steam.json'))

function placeImage(game) {
	game.image = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, 'images/' + game.appid + '.jpg'), 'base64')
	return game
}

// check if a game exist
exports.hasGame = function(name) {
	const found = steam.find((game) => (game.name === name))
	if(found) {
		return true
	}
	return false
}

// get a game by its name
exports.getGame = function(name) {
	name = name.toLowerCase()
	const found = steam.find((game) => (game.name.toLowerCase() === name))
	if(found) {
		return placeImage(found)
	}
	return undefined
}

// get 5 random games
exports.randomGames = function() {
	return [1, 2, 3, 4, 5].map(i => placeImage(steam[random.int(0, steam.length)]))
}

// get 5 games that their name starts with the name givin
exports.autoComplete = function(name) {
	name = name.toLowerCase()
	const found = steam.filter((game) => game.name.toLowerCase().startsWith(name))
	if(found) {
		return found.slice(0, 5).map(game => placeImage(game))
	} else {
		return null
	}
}
