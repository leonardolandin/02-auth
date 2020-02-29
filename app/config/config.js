const express = require('express');
const app = express();
const routes = require('../routes');

app.use('/', routes);
app.use('/login', routes); 

module.exports = app;