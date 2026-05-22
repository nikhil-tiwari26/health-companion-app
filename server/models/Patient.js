
const mongoose = require("mongoose");

const healthRecordSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  bloodPressure: { type: String },
  heartRate: { type: Number },
  weight: { type: Number },
  bloodSugar: { type: Number },
  notes: { type: String },
});

const patientSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    age: { type: Number },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    bloodGroup: { type: String },
    allergies: { type: [String], default: [] },
    chronicConditions: { type: [String], default: [] },
    healthRecords: [healthRecordSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);