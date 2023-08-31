// Environment
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mysql from "mysql2";
// import { databaseMiddleware } from "./middleware/database-middleware.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// Database Connection
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
// app.use(databaseMiddleware);

// App Listen
app.listen(port, () => {
  console.log(`server running on localhost:${port}`);
});
