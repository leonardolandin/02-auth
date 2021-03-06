const AuthDAO = require('../../dao/AuthDAO');
const https = require('https');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv/config');


module.exports = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    const encryptPassword = (password) => {
        const cipher = crypto.createCipher(process.env.ENCRYPT_ALGORITHM, process.env.ENCRYPT_KEY);
        cipher.update(password);
        return cipher.final(process.env.ENCRYPT_TYPE);
    };

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
        if(objUser && objUser.password && objUser.password.length > 128) {
            return ValidationException('A senha não pode conter mais de 128 caracteres', res)
        }
        if(objUser && objUser.password && objUser.passwordConfirmed) {
            if(objUser.password !== objUser.passwordConfirmed) {
                return ValidationException('As senhas não conferem', res)
            }
        }
        if(objUser && objUser.password && objUser.password.length <= 6 && objUser.passwordConfirmed && objUser.passwordConfirmed.length <= 6) {
            return ValidationException('A senha precisa conter mais de 6 caracteres', res)
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
        AuthDAO.getUserByEmail(dataUser.email).then((data) => {
            let userExist = data;

            if(userExist === null) {
                const secretRecaptcha = process.env.RECAPTCHA_KEY;
                const recaptchaVerification = `https://www.google.com/recaptcha/api/siteverify?secret=${secretRecaptcha}&response=${dataUser.recaptcha}&remoteip=${req.connection.remoteAddress}`;

                https.get(recaptchaVerification, (response) => {
                    let dataRaw = '';
                    response.on('data', (dataRawTO) => { dataRaw += dataRawTO })
                    response.on('end', () => {
                        try {
                            let userToken = jwt.sign(dataUser, process.env.JWT, {expiresIn: "12h"});
                            let parsedResponse = JSON.parse(dataRaw);

                            if(userToken !== null && parsedResponse !== null) {
                                let dateNow = new Date();
                                dateNow.setSeconds(0, 0);
                                dataUser.password = encryptPassword(dataUser.password);
                                dataUser.passwordConfirmed = encryptPassword(dataUser.passwordConfirmed);

                                dataUser.token = userToken;
                                dataUser.active = true;
                                dataUser.completeRegister = true;
                                dataUser.created = dateNow;
                                dataUser.modificated = null;

                                AuthDAO.createNewUser(dataUser).then((result) => {
                                    let responseData = {
                                        user: dataUser,
                                        recaptcha: parsedResponse,
                                        statusCode: 200
                                    }

                                    res.send(responseData);
                                })
                            }
                        } catch (e) {
                        }
                    })
                })
            } else {
                return ValidationException('O e-mail já está cadastrado no site', res)
            }
        })
    }
}