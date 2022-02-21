const express = require('express')
const router = express.Router()
const auth  = require('../middleware/auth.jwt')
const scheduleController = require("../controller/schedule.controller")

router.use(auth)

router.post('/add-schedule', scheduleController.addSchedule)
router.get('/get-all-schedule', scheduleController.getAllSchedule)
router.get('/get-schedule-by-email', scheduleController.getScheduleByEmail)
router.put('assign-schedule', scheduleController.assignSchedule)

module.exports = router