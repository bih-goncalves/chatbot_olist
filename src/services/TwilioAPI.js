
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
const sensitiveData = require('../../API_Key');

module.exports = {

    sendMessage(message){
        sgMail.setApiKey(sensitiveData.SENDGRID_API_KEY);
        sgMail.send(message);
    }
}
