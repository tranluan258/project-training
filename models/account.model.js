const knex = require('../config/knex')
const uuid = require('short-uuid')

module.exports = {
    signUp: async function(username, password) {
        try {
           let account = await knex.select().from('account').where('username', username)
           if(account.length > 0) {
               return {code: 2}
           }else {
                let result = await knex('account').insert({id: uuid.generate(),username: username,password: password})
                if(result.length > 0){
                    return {code: 1}
                }
                return {code: 0}
           }
        } catch (error) {
            return error
        }
    },

    signIn: async function(username,password) {
        try {
            let account = await knex.select().from('account').where( {
                username: username,
                password: password
            })
            if(account.length > 0){
                return {code: 1, account: account}
            }else {
                return {code: 0}
            }
        }catch(error) {
            console.error(error)
        }
    },

    updateRefreshToken: async function(username, refreshToken) {
        await knex('account').where('username', username).update({refreshToken: refreshToken})
    },
    checkRefreshToken: async function(refreshToken) {
        try {
            let account = await knex.select().from('account').where('refreshToken', refreshToken)
            if(account.length > 0) {
                return {
                    code: 1,
                    account: account
                }
            }else {
                return {
                    code: 0
                }
            }
        } catch (error) {
            console.log(error)
            return {
                code: 2
            }
        }
    }
}