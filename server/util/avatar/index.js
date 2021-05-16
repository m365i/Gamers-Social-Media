
const path = require('path')
const fs = require('fs')

// https://github.com/Ivanmtta/anonymous-animals-api

function hashName(name, bound) {
	let total = 0
	for (let i = 0; i < name.length; i++) {
		total += name.charCodeAt(i)
	}
	return total % bound
}

// get an avatar image file path by a user name
exports.usernameAvatar = function(username) {
	const avatars = fs.readdirSync(path.join(__dirname, 'images/'))
	if (avatars[0] == '.DS_Store') {
		avatars.splice(0, 1)
	}
	const avatarIndex = hashName(username, avatars.length)
	return path.join(__dirname, 'images/' + avatars[avatarIndex])
}

// get an avatar image file path by aa animal name
exports.animalAvatar = function(animal) {
	const link = path.join(__dirname, 'images/' + animal + '.png')
	if(fs.existsSync(link)) {
		return link
	}
	return undefined
}