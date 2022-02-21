const nodemailer = require('nodemailer')

module.exports = {
    sendMail: function sendMail(emailClient,dateExamination,hours,title){
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "hostpitallabcd@gmail.com",
                pass: "tranluan258"
            }
        })

        let content  = ' '
        content += `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h1>${title}</h1>
                <h4 style="color: #0085ff">Mời quý khách đến tái khám vào lúc ${hours} giờ ngày ${dateExamination}</h4>
                <span style="color: black">Xin cảm ơn</span>
            </div>
        </div>`
        let mailOptions =  {
            from: "Hospital ABC",
            to: emailClient,
            subject: "Thông báo lịch tái khám",
            html: content
        }

        transporter.sendMail(mailOptions,(err,info) => {
            if(err) {
                console.log(err)
            }
        })
    }
}