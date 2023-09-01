import { ObjectId } from "mongodb";

// Get all patients
export const getAllPatients = async (req, res) => {
  if (req.query.name) {
    const name = req.query.name;
    console.log(name);
    const searchPattern = new RegExp(name, "i");
    try {
      const patients = await req.db
        .collection("patients")
        .find({ name: searchPattern })
        .toArray();
      console.log(patients);
      if (patients.length === 0) {
        res.status(404).json({ message: "Patients not found" });
        return;
      }
      res
        .status(200)
        .json({ message: `Patients with name: ${name}`, data: patients });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  } else
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
      .updateOne({ _id: new ObjectId(patientId) }, { $set: updatedData });
    if (!result) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }
    res.status(200).json({ message: "Patient info updated", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get patient with id
export const getPatientById = async (req, res) => {
  const patientId = req.params.id;
  try {
    const result = await req.db
      .collection("patients")
      .findOne({ _id: new ObjectId(patientId) });
    console.log(result);
    if (!result) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Retrieved patient with requested id", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete patient with id
export const deletePatient = async (req, res) => {
  const patientId = req.params.id;
  try {
    const result = await req.db
      .collection("patients")
      .deleteOne({ _id: new ObjectId(patientId) });
    if (!result) {
      res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient info deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // Search patients by name (?)
// export const searchPatientByName = async (req, res) => {
//   const name = req.query.name;
//   console.log(name);
//   const searchPattern = new RegExp(name, "i");
//   try {
//     const patients = await req.db
//       .collection("patients")
//       .find({ name: searchPattern })
//       .toArray();
//     console.log(patients);
//     if (patients.length === 0) {
//       res.status(404).json({ message: "data empty" });
//       return;
//     }
//     res
//       .status(200)
//       .json({ message: `Patients with name: ${name}`, data: patients });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// };
