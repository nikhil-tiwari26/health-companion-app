
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { roleGuard } = require("../middleware/roleMiddleware");
const Patient = require("../models/Patient");

// Get patient profile
router.get("/profile", protect, roleGuard("patient"), async (req, res) => {
  const patient = await Patient.findOne({ user: req.user._id }).populate("user", "name email");
  res.json(patient);
});

// Update health record
router.post("/health-record", protect, roleGuard("patient"), async (req, res) => {
  const patient = await Patient.findOne({ user: req.user._id });
  patient.healthRecords.push(req.body);
  await patient.save();
  res.json({ message: "Health record added", healthRecords: patient.healthRecords });
});

module.exports = router;