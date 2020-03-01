const LoginDAO = require('../../dao/LoginDAO')

module.exports = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const ValidationException = (message, response) => {
        let sendObject = {
            statusCode: 401,
            message: message
        }
        response.send(sendObject)
    }
    
    let dataUser = JSON.parse(req.params.dataUser);

    if(dataUser.user && dataUser.pass) {
        if(dataUser.user.length > 254) {
            return ValidationException('O e-mail não pode conter mais de 254 caracteres', res)
        }
        if(dataUser.pass.length > 128) {
            return ValidationException('A senha não pode conter mais de 128 caracteres', res)
        }
        if(!dataUser.user.includes('@')) {
            return ValidationException('O e-mail inserido não contém um formato de e-mail válido (@)', res)
        } 
        
        LoginDAO.getUserByEmail(dataUser.user).then((data) => {
            let dataDAO = data
            if(dataDAO === null) {
               return ValidationException('Não existe um usuário com esse e-mail', res) 
            }
            console.log(dataDAO)
            console.log(dataDAO.email)
            console.log()
            if(dataUser.user == dataDAO.email && dataUser.pass == dataDAO.password) {
                res.send('perdemos')
            }
        })

    }
}