
const express = require("express");
const router = express.Router();
const { getAllUsers, approveDoctor, deleteUser } = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { roleGuard } = require("../middleware/roleMiddleware");

router.get("/users", protect, roleGuard("admin"), getAllUsers);
router.put("/approve/:id", protect, roleGuard("admin"), approveDoctor);
router.delete("/user/:id", protect, roleGuard("admin"), deleteUser);

module.exports = router;