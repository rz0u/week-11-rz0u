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

patientRouter.get("/", getAllPatients);
patientRouter.post("/", createPatient);
patientRouter.put("/", updatePatient);
patientRouter.get("/", getPatientById);
patientRouter.delete("/", deletePatient);
patientRouter.get("/", searchPatientByName);
