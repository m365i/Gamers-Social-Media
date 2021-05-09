
var mongoose = require('mongoose')
var SHA256 = require('crypto-js/sha256')
const random = require('random')
random.use(Math.random)

const userSchema = new mongoose.Schema({
	email: String,
	password: String,
	salt: String
})

userSchema.methods.validPassword = function (password) {
	const real = this.password,
		attempt = SHA256(password + this.salt).toString()
	return (real.localeCompare(attempt) === 0)
}

userSchema.methods.setPassword = function (password) {
	random.see
	this.salt = SHA256(random.normal()).toString()
	this.password = SHA256(password + this.salt).toString()
}

let User = mongoose.model('User', userSchema)

// passportjs auth
User.authenticate = function (email, password, done) {
	User.findOne({ email }, function (err, user) {
		if (err) {
			return done(err)
		}
		if (!user) {
			return done(null, false, { message: 'incorrect email' })
		}
		if (!user.validPassword(password)) {
			return done(null, false, { message: 'incorrect password' })
		}
		return done(null, user)
	})
}
User.serializeUser = function (user, done) {
	done(null, JSON.stringify({ email: user.email, id: user._id }))
}
User.deserializeUser = function (user, done) {
	done(null, JSON.parse(user))
}

module.exports = User