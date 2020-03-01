const LoginAPI = require('../../dao/LoginDAO')

module.exports = (req, res) => {
    res.send('gorila')
    console.log(req.params.dataUser)
    LoginAPI.getUserByEmail({teste: 'name'}).then((data) => {
        console.log(data)
    })

}