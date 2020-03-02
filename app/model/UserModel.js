const mongoDB = require('../database');

const dataSchema = new mongoDB.Schema({
    email: String,
    password: String
})
const User = mongoDB.model('user', dataSchema, 'users')


module.exports = User 