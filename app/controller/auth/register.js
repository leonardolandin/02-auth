const AuthDAO = require('../../dao/AuthDAO');


module.exports = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body)
}