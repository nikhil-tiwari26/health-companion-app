
const User = require("../models/User");
const Doctor = require("../models/Doctor");

// Get all users
const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Approve doctor
const approveDoctor = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.isApproved = true;
  await user.save();
  res.json({ message: "Doctor approved successfully" });
};

// Delete user
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  await user.deleteOne();
  res.json({ message: "User deleted successfully" });
};

module.exports = { getAllUsers, approveDoctor, deleteUser };