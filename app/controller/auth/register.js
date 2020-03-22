const AuthDAO = require('../../dao/AuthDAO');


module.exports = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let dataUser = JSON.parse(req.params.dataNewUser);
    
    console.log(dataUser.name);
    res.send('pinto')
}