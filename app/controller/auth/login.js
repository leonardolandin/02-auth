const LoginAPI = require('../../dao/LoginDAO')

module.exports = (a, b) => {
    LoginAPI.getUser({teste: 'name'}).then((data) => {
        console.log(data)
    })

}