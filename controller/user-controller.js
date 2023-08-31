import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SIGN } from "../utils/jwt-token.js";
import { StandardError } from "../constant/standard-error.js";

// Register User
const registerService = async (req, username, role, password) => {
  const user = await db.collection("users").findOne({ username });
  if (user) {
    throw new StandardError({ message: "Username is taken", status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await req.db
    .collection("users")
    .insertOne({ username, role, password: hashedPassword });

  return newUser;
};

export const registerUser = async (req, res, next) => {
  const { username, role, password } = req.body;

  try {
    const newUser = await registerService(req, username, role, password);

    res.status(201).json({
      message: "User successfully registered",
      data: newUser,
    });
  } catch (error) {
    const standardError = new StandardError({
      message: error.message || "Failed registering new user",
      status: 500,
    });
    next(standardError);
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await db.collection("users").findOne({ username });
  if (!user) {
    throw new StandardError({ message: "Username not found", status: 404 });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (isPasswordCorrect) {
    const token = jwt.sign(
      { username: user.username, id: user._id, role: user.role },
      JWT_SIGN
    );
    res.status(200).json({
      message: "Logged in successfully",
      data: token,
    });
  } else {
    throw new StandardError({ message: "Incorrect password", status: 400 });
  }
};
