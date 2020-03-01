const routes = require('express').Router();
const home = require('../controller');
const login = require('../controller/auth/login');

routes.get('/', home); 
routes.get('/login/:dataUser', login);

module.exports = routes;
