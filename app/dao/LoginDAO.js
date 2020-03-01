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
module.exports = LoginAPI;













