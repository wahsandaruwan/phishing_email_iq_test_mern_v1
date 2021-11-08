const nodemailer = require('nodemailer')
require('dotenv/config')

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
})

exports.sendEmail = async (email, subject, password) => {
    try{
        await transporter.sendMail({
            from: `Phishing Test ${process.env.EMAIL}`,
            to: email,
            subject: subject,
            html: `<h2>${subject}</h2><br><h3>Here is your credentials...</h3><br><b>Email address : ${email}</b><br><b>Password : ${password}</b>`
        });
    }catch(err){
        console.log(err.message)
    }
}
