import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";

export const databaseMiddleware = (req, res, next) => {
  const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
  console.log("database");
  db.connect((err) => {
    if (err) throw err;
    console.log("database connected");
  });
  req.db = db;
  next();
};
