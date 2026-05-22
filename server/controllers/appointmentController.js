const Appointment = require("../models/Appointment");

// Book Appointment
const bookAppointment = async (req, res) => {
  try {
    const { doctor, date, timeSlot, symptoms } = req.body;

    if (!doctor || !date || !timeSlot) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Check if slot already booked
    const existing = await Appointment.findOne({
      doctor,
      date:     new Date(date),
      timeSlot,
      status:   { $in: ["pending", "confirmed"] },
    });

    if (existing) {
      return res.status(400).json({ message: "This time slot is already booked. Please choose another." });
    }

    const appointment = await Appointment.create({
      patient:  req.user._id,
      doctor,
      date:     new Date(date),
      timeSlot,
      symptoms,
    });

    const populated = await Appointment.findById(appointment._id)
      .populate("doctor",  "name email")
      .populate("patient", "name email");

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booked slots for a doctor on a date
const getBookedSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.query;
    const appointments = await Appointment.find({
      doctor: doctorId,
      date:   new Date(date),
      status: { $in: ["pending", "confirmed"] },
    });
    const bookedSlots = appointments.map((a) => a.timeSlot);
    res.json(bookedSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Patient's Appointments
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id })
      .populate("doctor", "name email")
      .sort({ date: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Doctor's Appointments
const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user._id })
      .populate("patient", "name email")
      .sort({ date: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Appointment Status
const updateAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    appointment.status       = req.body.status       || appointment.status;
    appointment.prescription = req.body.prescription || appointment.prescription;
    appointment.notes        = req.body.notes        || appointment.notes;

    const updated = await appointment.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Appointments (Admin)
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate("doctor",  "name email")
      .sort({ date: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  getAllAppointments,
  getBookedSlots,
};