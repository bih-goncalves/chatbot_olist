
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

let API_KEY = null

// For development
// const sensitiveData = require('../../API_Key');
// API_KEY = sensitiveData.SENDGRID_API_KEY

// For production
API_KEY = process.env.SENDGRID_API_KEY;

module.exports = {

    sendMessage(message){
        sgMail.setApiKey(API_KEY);
        sgMail.send(message);
    }
}
