import { Router } from "express";
import { authorizationMiddleware } from "../middleware/auth-middleware.js";
import {
  getAllPatients,
  createPatient,
  updatePatient,
  getPatientById,
  deletePatient,
  searchPatientByName,
} from "../controller/patient-controller.js";

export const patientRouter = Router();

patientRouter.get("/", authorizationMiddleware, getAllPatients);
patientRouter.post("/", createPatient);
patientRouter.put("/", authorizationMiddleware, updatePatient);
patientRouter.get("/", getPatientById);
patientRouter.delete("/", authorizationMiddleware, deletePatient);
patientRouter.get("/", searchPatientByName);
