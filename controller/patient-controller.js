import { ObjectId } from "mongodb";

// Get all patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await req.db.collection("patients").find().toArray();
    res.status(200).json({
      message: "All patients retrieved",
      data: patients,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Post new patients
export const createPatient = async (req, res) => {
  const {
    name,
    address,
    dob,
    sex,
    marriageStatus,
    emergencyContact,
    medicalRecords,
  } = req.body;
  const registrationDate = new Date();
  try {
    const newPatient = await req.db.collection("patients").insertOne({
      name,
      address,
      dob,
      sex,
      marriageStatus,
      emergencyContact,
      medicalRecords,
      registrationDate,
    });

    res.status(201).json({
      message: "Patient info added",
      data: newPatient,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update patients info
export const updatePatient = async (req, res) => {
  const patientId = req.params.id;
  const updatedData = req.body;
  try {
    const result = await req.db
      .collection("patients")
      .updateOne({ _id: patientId }, { $set: updatedData });
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }
    res.status(200).json({ message: "Patient info updated", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get patient with id
export const getPatientById = (req, res) => {};
// Delete patient with id

// Search patients by name (?)
