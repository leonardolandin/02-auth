const express = require('express');
const app = express();
const routes = require('../routes');

app.use(express.json());
app.use('/', routes);
app.use('/login', routes); 

module.exports = app;