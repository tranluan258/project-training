require("dotenv").config()
const express = require("express")

const app =  express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 8080

app.get("/", (req,res) => {
    res.status(200).json({message: "Welcome to api hospital"})
})


app.listen(PORT, () => console.log("Api listen PORT "+ PORT))