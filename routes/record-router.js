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
recordRouter.get("/:id", authorizationMiddleware, getRecordByPatientId);
recordRouter.put("/:id", authorizationMiddleware, updateRecord);
recordRouter.delete("/:id", authorizationMiddleware, deleteRecord);
recordRouter.get("/search?year={year}&month={month}", getRecordByTime);
