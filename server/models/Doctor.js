
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, default: 0 }, // in years
    qualifications: { type: String },
    consultationFee: { type: Number, default: 0 },
    availableDays: {
      type: [String],
      default: ["Monday", "Wednesday", "Friday"],
    },
    availableTime: {
      start: { type: String, default: "09:00" },
      end: { type: String, default: "17:00" },
    },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);