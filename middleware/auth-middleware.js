import jwt from "jsonwebtoken";
import { JWT_SIGN } from "../utils/jwt-token.js";
import { StandardError } from "../constant/standard-error.js";

export const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new StandardError({ message: "Access Denied", status: 401 });
  } else {
    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, JWT_SIGN);
      console.log(decodedToken, "------------decodedToken");
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export const authorizationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new StandardError({ message: "Access Denied", status: 401 });
  } else {
    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, JWT_SIGN);
      if (decodedToken.role === "doctor") {
        next();
      } else {
        throw new StandardError({ message: "Access Denied", status: 401 });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
