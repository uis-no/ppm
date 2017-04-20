const nodemailer = require('nodemailer');

// TODO: set this up as an environment variables
const user = '';
const pass = '';


var smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: user,
    pass: pass
  }
});

module.exports.sendMail =  (receipient, subject, content) => {
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

  smtpTransport.close();

}
