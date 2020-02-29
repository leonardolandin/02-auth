const app = require('./app/config/config')
const port = 3000;
const mongoDB = require('./app/database');
const uri = "mongodb://localhost:27017/02"

app.listen(port, function() {
})