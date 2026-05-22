const express = require("express");
const router  = express.Router();
const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  getAllAppointments,
  getBookedSlots,
} = require("../controllers/appointmentController");
const { protect }   = require("../middleware/authMiddleware");
const { roleGuard } = require("../middleware/roleMiddleware");

router.post("/",              protect, roleGuard("patient"), bookAppointment);
router.get("/my",             protect, roleGuard("patient"), getMyAppointments);
router.get("/booked-slots",   protect, getBookedSlots);
router.get("/doctor",         protect, roleGuard("doctor"),  getDoctorAppointments);
router.put("/:id",            protect, roleGuard("doctor"),  updateAppointmentStatus);
router.get("/all",            protect, roleGuard("admin"),   getAllAppointments);

// ✅ This line was missing!
module.exports = router;