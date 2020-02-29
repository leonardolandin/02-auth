const MongoDB = require("mongoose");
const uri = "mongodb://localhost:27017/02";
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