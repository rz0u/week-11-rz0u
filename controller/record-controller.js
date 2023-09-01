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
  const { patientId, symptoms, diagnosis, remedy, prescription } = req.body;
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
    const result = await req.db
      .collection("records")
      .find({ patientId })
      .toArray();
    console.log(result);
    if (result.length === 0) {
      res.status(404).json({ message: "Record not found" });
      return;
    }
    res.status(200).json({ message: "Records with PatientId", data: result });
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
      .collection("records")
      .updateOne({ _id: new ObjectId(recordId) }, { $set: updatedData });
    console.log(result);
    if (result.matchedCount === 0) {
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
      .deleteOne({ _id: new ObjectId(recordId) });
    if (!result) {
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
    const results = await req.db
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
    if (!results) {
      res.status(404).json({ message: "Records not found" });
      return;
    }
    res.status(200).json({ message: "Records found", data: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
