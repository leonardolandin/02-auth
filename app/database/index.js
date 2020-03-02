const MongoDB = require("mongoose");
require('dotenv/config');

const uri = process.env.MONGO_DB;
MongoDB.connect(uri, {
    useNewUrlParser: true,
});
const database = MongoDB.connection;
database.on("error", () => {
    console.log("> error occurred from the database");
});
database.once("open", () => {
    console.log("> successfully opened the database");
});
module.exports = MongoDB;