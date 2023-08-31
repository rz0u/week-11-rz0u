// Environment
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { databaseMiddleware } from "./middleware/database-middleware.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// Database Connection
app.use(databaseMiddleware);

// App Listen
app.listen(port, () => {
  console.log(`server running on localhost:${port}`);
});
