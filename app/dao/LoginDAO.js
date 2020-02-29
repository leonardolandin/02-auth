const mongoDB = require('../database');
const User = require('../model/UserModel')
const LoginAPI = {}

LoginAPI.getUser = async function(objCredentials) {
    User.findOne({}, (err, result) => {
        return new Promise((resolve, reject) => {
            resolve(result)
        })
    })
}
module.exports = LoginAPI;













