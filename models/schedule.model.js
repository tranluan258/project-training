const knex  = require('../config/knex')
const uuid = require('short-uuid')


module.exports = {
    addSchedule : async function (title,emailClient,idDoctor,idFaculty,idRoom,dateExamination,hours) {
        let timestamp = new Date()
        let newDateExamination = dateExamination.replace(/(\d+[/])(\d+[/])/, '$2$1');
        let result = await knex('schedule').insert({
            id: uuid.generate(), 
            title:title,
            emailClient:emailClient,
            idDoctor:idDoctor,
            idFaculty:idFaculty,
            idRoom: idRoom,
            dateExamination:new Date(newDateExamination),
            hours:hours,
            dateCreated: timestamp, 
            dateModified: timestamp
        })
        if(result.length > 0) {
            return {
                code: 0
            }
        }
    }
}