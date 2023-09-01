import { ObjectId } from "mongodb";

// Get all records
export const getAllRecords = async (req, res) => {
  try {
    const records = await req.db.collection("records").find().toArray();
    res.status(200).json({
      message: "All records retrieved",
      data: records,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Post new records
export const createRecord = async (req, res) => {
  const { patient_id, symptoms, diagnosis, remedy, prescription } = req.body;
  const appointmentDate = new Date();
  try {
    const newRecord = await req.db.collection("records").insertOne({
      patientId,
      symptoms,
      diagnosis,
      remedy,
      prescription,
      appointmentDate,
    });

    res.status(201).json({ message: "Record info added", data: newRecord });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get records with patient_id
export const getRecordByPatientId = async (req, res) => {
  const patientId = req.params.patientId;
  try {
    const records = await req.db
      .collection("records")
      .find({ patientId })
      .toArray();
    if (result.matchedCount === 0) {
      res.status(404).json({ message: "Record not found" });
      return;
    }
    res.status(200).json({ message: "Records with ID", data: records });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update records with id
export const updateRecord = async (req, res) => {
  const recordId = req.params.id;
  const updatedData = req.body;
  try {
    const result = await req.db
      .collection("patients")
      .updateOne({ _id: recordId }, { $set: updatedData });
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "Record not found" });
      return;
    }
    res.status(200).json({ message: "Record info updated", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete records with id
export const deleteRecord = async (req, res) => {
  const recordId = req.params.id;
  try {
    const result = await req.db
      .collection("records")
      .updateOne(
        { _id: new ObjectId(recordId) },
        { $set: { deletedAt: new Date(), updatedAt: new Date() } }
      );
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json({ message: "Record info deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get records with month and year
export const getRecordByTime = async (req, res) => {
  const year = parseInt(req.query.year);
  const month = parseInt(req.query.month);

  try {
    const records = await req.db
      .collection("records")
      .find({
        $expr: {
          $and: [
            { $eq: [{ $year: "$appointmentDate" }, year] },
            { $eq: [{ $month: "$appointmentDate" }, month] },
          ],
        },
      })
      .toArray();
    if (result.matchedCount === 0) {
      res.status(404).json({ message: "Records not found" });
      return;
    }
    res.status(200).json({ message: "Records found", data: records });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
