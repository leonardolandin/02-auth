const routes = require('express').Router();
const home = require('../controller');
const login = require('../controller/auth/login');
const register = require('../controller/auth/register')

routes.get('/', home); 
routes.get('/login/:dataUser', login);
routes.post('/register', register)

module.exports = routes;
