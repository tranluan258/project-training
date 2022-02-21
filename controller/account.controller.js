const accountModel = require('../models/account.model')
const jwt = require('jsonwebtoken')
const {JWT_SECRET,JWT_REFRESH} = process.env
module.exports = {
    signUp: async function (req, res) {
        const {username, password} = req.body
        let result  = await accountModel.signUp(username, password)
        if(result.code === 1) {
            res.status(201).json({message: "Sign up successful"})
        }else if(result.code === 0){
            res.status(400).json({message: "Sign up fail"})
        }else {
            res.status(400).json({message: "Account already exist"})
        }
    },
    signIn: async function (req, res) {
        const { username, password } = req.body
        let result  = await accountModel.signIn(username, password)
        if(result.code === 1){
            jwt.sign({
                id: result.account.id
            },JWT_SECRET,{
                expiresIn: "30m"
            }, (err, token) => {
                let accessToken = token;
                jwt.sign({
                    id: result.account.id
                }, JWT_REFRESH,(err, token) => {
                    accountModel.updateRefreshToken(username,token);
                    res.status(200).json({message: "Login successful", accessToken: accessToken, refreshToken: token});
                })
            })
        }
    },
    refreshToken: async function (req, res) {
        const {refreshToken} = req.body
        let result =  await accountModel.checkRefreshToken(refreshToken)
        if(result.code === 1){
            jwt.sign({
                id: result.account.id
            }, JWT_SECRET, {
                expiresIn: "15m"
            }, (err, token) => {
                res.status(200).json({code: 200, token: token})
            })
        }else if(result.code === 0){
            res.status(404).json({code: 404, message: "Not Found"})
        }else {
            res.status(500).json({code: 500, message: "Internal server error"})
        }
    }
}