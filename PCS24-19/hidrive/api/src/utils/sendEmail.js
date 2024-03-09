import nodemailer from "nodemailer";

const sendEmail = (to,subject) => {

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'raven.rath83@ethereal.email',
        pass: 'dwVh7r9AfZM5ME7vqK'
    }
  });

  const mailOptions = {
    from: "<raven.rath83@ethereal.email>",
    to: to,
    subject: subject,
    text: "This is my first email. I am so excited!",
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) throw Error(error);
       console.log('Email Sent Successfully');
    console.log(info);
});
};

export default sendEmail
