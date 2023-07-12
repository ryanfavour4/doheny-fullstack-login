const { Client } = require("pg");


const user = process.env.USER;
const host = process.env.HOST;
const database = process.env.DATABASE;
const password = process.env.PASSWORD;
const port = process.env.PORT;


const client = new Client({ user, host, database, password, port, });
client.connect().then(() => console.log("Connected successfully to postgres database"));
module.exports = client;