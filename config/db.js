const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "sandro",
  password: "password",
  database: "live_node_express_passport",
  port: 3306,
});

db.connect((error) => {
  if (error) throw error;
  console.log("Connecté à la base de données !");
});

module.exports = db;
