import { Router } from "express";
import {
  getAllRecords,
  createRecord,
  getRecordByPatientId,
  updateRecord,
  deleteRecord,
  getRecordByTime,
} from "../controller/record-controller.js";
import { authorizationMiddleware } from "../middleware/auth-middleware.js";

export const recordRouter = Router();

recordRouter.get("/", getAllRecords);
recordRouter.post("/", createRecord);
recordRouter.get("/", authorizationMiddleware, getRecordByPatientId);
recordRouter.put("/", authorizationMiddleware, updateRecord);
recordRouter.delete("/", authorizationMiddleware, deleteRecord);
recordRouter.get("/", getRecordByTime);
