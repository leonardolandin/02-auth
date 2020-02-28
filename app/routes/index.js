const routes = require('express').Router();
const login = require('../controller/auth/login')

routes.get('/', login);


module.exports = routes;
