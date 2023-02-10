const mysql = require("mysql2");
const dbConfig = require("./db.config");

//CREATE CONNECTION TO DB
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("connected to DB");
  }
});

async function query(query, values) {
  const promise = connection.promise();
  return ([rows, fields] = await promise.query(query, values));
}
module.exports = { connection, query };
