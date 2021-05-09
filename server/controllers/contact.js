
var {StatusCodes} = require('http-status-codes')
var Contact = require('../models/contact')
var Joi = require('joi')

exports.contact = async function(req, res, next) {
    const { message, name, email }  = req.body
    // validate input
    try {
        const name_validator = Joi.string().min(3).max(64)
        Joi.attempt(name, name_validator)
        const email_validator = Joi.string().email()
        Joi.attempt(email, email_validator)
        const message_validator = Joi.string().min(1).max(1024)
        Joi.attempt(message, message_validator)
    } catch(err) {
        return res.status(StatusCodes.BAD_REQUEST).send("name, email or message are not formatted correctly")
    }
    // commit
    try {
        let contact = new Contact({message, name, email})
        await contact.save()
        return res.status(StatusCodes.OK).send("message was sent")
    } catch(err) {
        return next(err)
    }
}