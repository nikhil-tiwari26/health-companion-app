const express = require("express");
const router  = express.Router();
const { protect }   = require("../middleware/authMiddleware");
const { roleGuard } = require("../middleware/roleMiddleware");
const Doctor  = require("../models/Doctor");
const User    = require("../models/User");
const bcrypt  = require("bcryptjs");

// Get all doctors (public)
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("user", "name email isApproved profilePic");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update doctor profile
router.put("/profile", protect, roleGuard("doctor"), async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id });
    Object.assign(doctor, req.body);
    await doctor.save();
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ SEED ROUTE — Add test doctors (run once)
router.post("/seed", async (req, res) => {
  try {
    const doctorsData = [
      { name: "Dr. Arjun Sharma",   email: "arjun@doctor.com",   specialization: "Cardiologist",     fee: 500, experience: 10 },
      { name: "Dr. Priya Patel",    email: "priya@doctor.com",   specialization: "Dermatologist",    fee: 400, experience: 7  },
      { name: "Dr. Rahul Gupta",    email: "rahul@doctor.com",   specialization: "Neurologist",      fee: 600, experience: 12 },
      { name: "Dr. Sneha Mehta",    email: "sneha@doctor.com",   specialization: "Pediatrician",     fee: 350, experience: 5  },
      { name: "Dr. Vikram Singh",   email: "vikram@doctor.com",  specialization: "Orthopedic",       fee: 550, experience: 9  },
      { name: "Dr. Anjali Verma",   email: "anjali@doctor.com",  specialization: "Gynecologist",     fee: 450, experience: 8  },
    ];

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("doctor123", salt);

    for (const d of doctorsData) {
      // Skip if already exists
      const exists = await User.findOne({ email: d.email });
      if (exists) continue;

      const user = await User.create({
        name: d.name, email: d.email,
        password: hashedPassword,
        role: "doctor", isApproved: true,
      });

      await Doctor.create({
        user:             user._id,
        specialization:   d.specialization,
        consultationFee:  d.fee,
        experience:       d.experience,
        availableDays:    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        availableTime:    { start: "09:00", end: "17:00" },
      });
    }

    res.json({ message: "✅ Doctors seeded successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;