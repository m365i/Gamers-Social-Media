
var {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login')

module.exports = {
    ensureLoggedIn: function() {
        return ensureLoggedIn('/404')
    },
    ensureLoggedOut: function() {
        return ensureLoggedOut('/404')
    }
}