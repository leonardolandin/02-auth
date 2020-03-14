const mongoDB = require('../database');

const dataSchema = new mongoDB.Schema({
    email: String,
    password: String,
    token: String
})
const User = mongoDB.model('user', dataSchema, 'users')


module.exports = User 