
var mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    from_id: String,
    to_id: String,
    update: String,
    timestamp: String,

})

module.exports = mongoose.model('Notification', notificationSchema)