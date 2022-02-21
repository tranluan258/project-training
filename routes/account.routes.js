const express = require('express')
const routes = express.Router()
const accountController =  require('../controller/account.controller')

routes.post('/sign-up', accountController.signUp)
routes.post('/sign-in', accountController.signIn)
routes.post('/refresh-token', accountController.refreshToken)

module.exports = routes