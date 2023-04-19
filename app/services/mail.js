const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    service: 'Gmail',
    secure: false,
    port: 25,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }, tls: {
        rejectUnauthorized: false
    }
});

const mailSend = (email, subject, html) => {
    let mailOption = {
        from: 'jainishah1641@gmail.com',
        to: email,
        subject,
        html
    }
    return new Promise((resolve, reject) => {
        transport.sendMail(mailOption, function (error, response) {
            if (error) {
                reject(error)
            }
            else {
                resolve(response)
            }
        })
    })
}
module.exports = {
    mailSend
};