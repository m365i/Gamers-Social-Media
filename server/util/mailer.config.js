'use strict'
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
	host: process.env.SMTP_SERVER,
	port: process.env.SMTP_PORT,
	secure: false
})

function getMailTransporter() {
	return transporter
}

module.exports = getMailTransporter