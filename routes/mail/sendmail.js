const nodemailer = require("nodemailer");

const sendmail = (mail, text) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ramcherry500008@gmail.com", // generated ethereal user
      pass: "megastar11" // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = transporter.sendMail(
    {
      from: "ramcherry500008@gmail.com", // sender address
      to: `${mail}`, // list of receivers
      subject: "Bike Service", // Subject line
      text: `${text}` // plain text body
      //html: "<b>Hello world?</b>" // html body
    },
    function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("email sent" + info.response);
      }
    }
  );
};

module.exports = sendmail;
