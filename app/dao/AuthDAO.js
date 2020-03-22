const mongoDB = require('../database');
const User = require('../model/UserModel')
const LoginAPI = {}

LoginAPI.getUserByEmail = async function(objCredentials) {
    return User.findOne({'email': objCredentials}, (err, result) => {
        return new Promise((resolve, reject) => {
            resolve(result)
        })
    })
}

LoginAPI.setNewToken = async function(userId, newToken) {
    return User.updateOne({_id: userId}, {
        token: newToken
    } ,(err, result) => {
        return new Promise((resolve, reject) => {
            resolve(result)
        })
    })
}
module.exports = LoginAPI;













