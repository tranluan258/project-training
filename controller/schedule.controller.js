const scheduleModel = require('../models/schedule.model')
const sendMail = require('../mail/sendMail')

module.exports = {
    addSchedule: async function ( req, res) {
        const {title,emailClient,idDoctor,idFaculty,idRoom,dateExamination,hours} = req.body
        let result = await scheduleModel.addSchedule(title,emailClient,idDoctor,idFaculty,idRoom,dateExamination,hours)
        if(result.code === 0) {
            sendMail.sendMail(emailClient,dateExamination,hours,title)
            return res.status(201).json({code: 201, message: "Created schedule"})
        }
    }
}