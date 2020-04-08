const mongoDB = require('../database');
const User = require('../model/UserModel')
const AuthAPI = {}

AuthAPI.getUserByEmail = async function(objCredentials) {
    return User.findOne({'email': objCredentials}, (err, result) => {
        return new Promise((resolve, reject) => {
            resolve(result)
        })
    })
}

AuthAPI.setNewToken = async function(userId, newToken) {
    return User.updateOne({_id: userId}, {
        token: newToken
    } ,(err, result) => {
        return new Promise((resolve, reject) => {
            resolve(result)
        })
    })
}

AuthAPI.createNewUser = async function(newUserCredentials) {
    return User.insertMany(newUserCredentials, (err, result) => {
        return new Promise((resolve, reject) => {
            resolve(result)
        })
    })
}

module.exports = AuthAPI;













