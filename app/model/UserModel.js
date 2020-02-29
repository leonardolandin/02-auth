const mongoDB = require('../database');

const dataSchema = new mongoDB.Schema({})
const User = mongoDB.model('user', dataSchema, 'users')


module.exports = User 