import dotenv from "dotenv";
dotenv.config();

export const JW_SIGN = process.env.SECRET_KEY;
