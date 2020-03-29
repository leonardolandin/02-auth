const AuthDAO = require('../../dao/AuthDAO');
require('dotenv/config');


module.exports = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const ValidateCredentials = (objUser) => {
        if(objUser && objUser.email && objUser.email.length > 254) {
            return ValidationException('O e-mail não pode conter mais de 254 caracteres', res)
        }
        if(objUser && objUser.email && !objUser.email.includes('@')) {
            return ValidationException('O e-mail inserido não contém um formato de e-mail válido (@)', res)
        }
        if(objUser && objUser.name && objUser.name.length > 120) {
            return ValidationException('O nome não pode conter mais de 120 caracteres', res)
        }

        return true;
    }

    const ValidationException = (message, response) => {
        let sendObject = {
            statusCode: 401,
            message: message
        }
        response.send(sendObject)
    }

    let dataUser = JSON.parse(req.params.dataNewUser);

    if(dataUser && ValidateCredentials(dataUser)) {
        
    }
}