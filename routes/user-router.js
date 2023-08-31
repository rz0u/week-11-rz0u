import { Router } from "express";
import { registerUser, loginUser } from "../controller/user-controller.js";

export const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
