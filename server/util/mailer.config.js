"use strict"
const nodemailer = require("nodemailer")

let transporter

nodemailer.createTestAccount()
    .then(account => {
        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        })
    })

function getMailTransporter() {
    return transporter
}

module.exports = getMailTransporter