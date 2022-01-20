const nodemailer = require('nodemailer')
const config = require('../config')

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: config.EMAIL_HOST,
      service: config.EMAIL_SERVICE,
      port: 465,
      secure: true,
      auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASSWORD
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text
    })
    console.log('email sent sucessfully')
  } catch (error) {
    console.log('email not sent')
    console.log(error)
  }
}

module.exports = sendEmail
