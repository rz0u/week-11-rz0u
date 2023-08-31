import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";

export const databaseMiddleware = async (req, res, next) => {
  const mongoClient = await new MongoClient(process.env.MONGO_URI).connect();
  const db = mongoClient.db(process.env.MONGO_DB);
  req.db = db;

  next();
};
