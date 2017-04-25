const config = require('../config/config.js');
const nodemailer = require('nodemailer');

// TODO: set this up as an environment variables
const user = config.mail.user;
const pass = config.mail.pass;



var smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: user,
    pass: pass
  }
});

module.exports.sendMail =  (receipient, subject, content, fileName, filepath, contentType) => {
  console.log(typeof fileName);
  if (typeof fileName !== "undefined" && typeof filepath !== "undefined" && typeof contentType !== "undefined") {
    smtpTransport.sendMail({
      from: 'Jarida <' + user + '>',
      to: '<' + receipient + '>',
      subject: subject,
      text: content,
      attachments: [{
        filename: fileName,
        path: filepath,
        contentType: contentType
      }]
    }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Message sent to ' + res.accepted);
      }
    });
  } else {
    smtpTransport.sendMail({
      from: 'Jarida <' + user + '>',
      to: '<' + receipient + '>',
      subject: subject,
      text: content
    }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Message sent to ' + res.accepted);
      }
    });
  }


  smtpTransport.close();

}
