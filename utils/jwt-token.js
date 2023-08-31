import dotenv from "dotenv";
dotenv.config();

export const JWT_SIGN = process.env.SECRET_KEY;
