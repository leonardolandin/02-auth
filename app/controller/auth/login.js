const AuthDAO = require('../../dao/AuthDAO');
const https = require('https');
const jwt = require('jsonwebtoken');
require('dotenv/config');

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
        
        AuthDAO.getUserByEmail(dataUser.user).then((data) => {
            let dataDAO = data;
            if(dataDAO === null) {
               return ValidationException('Não existe um usuário com esse e-mail', res) 
            }

            if(dataUser.user == dataDAO.email && dataUser.pass == dataDAO.password && dataUser.recaptcha.length) {
                const secretKey = process.env.RECAPTCHA_KEY;
                const recaptchaVerification = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${dataUser.recaptcha}&remoteip=${req.connection.remoteAddress}`;
                let userID = dataDAO.id;

                https.get(recaptchaVerification, (response) => {
                    let dataRaw = '';
                    response.on('data', (dataRawTO) => { dataRaw += dataRawTO })
                    response.on('end', () => {
                        try {
                            let userToken = jwt.sign(dataUser, process.env.JWT, {expiresIn: "12h"});
                            let parsedResponse = JSON.parse(dataRaw);

                            if(userToken !== null) {
                                AuthDAO.setNewToken(userID, userToken).then((resp) => {
                                    if(parsedResponse != null) {
                                        let responseData = {
                                            user: dataDAO,
                                            recaptcha: parsedResponse,
                                            statusCode: 200
                                        }
                                        res.send(responseData)
                                    }  
                                })
                            }
                        } catch (e) {
                        }
                    })
                })
            } else {
                return ValidationException('Usuário com essas credenciais não existem', res)
            }
        })

    }
}