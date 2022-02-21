require("dotenv").config()
const express = require("express")
const logger = require("morgan")
const knex = require("./config/knex")
const accountRoutes = require('./routes/account.routes')
const scheduleRoutes = require('./routes/schedule.routes')

const app =  express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', accountRoutes)
app.use('/', scheduleRoutes)

const PORT = process.env.PORT || 8080

app.get("/", (req, res) => {
    res.status(200).json({message: "Welcome to api hospital management"})
})



app.listen(PORT, () => console.log("Api listen PORT "+ PORT))