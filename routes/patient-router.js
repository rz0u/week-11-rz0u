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
patientRouter.patch("/:id", authorizationMiddleware, updatePatient);
patientRouter.get("/:id", getPatientById);
patientRouter.delete("/:id", authorizationMiddleware, deletePatient);
patientRouter.put("/", searchPatientByName);
