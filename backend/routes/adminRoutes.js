const express = require("express");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const { getAllUsers, createUser, updateUser, deleteUser } = require("../controllers/adminController");
const router = express.Router();

// @router GET /api/admin/users
// @desc Get all (Admin only)
// access Private/Admin
router.get("/", protect, isAdmin, getAllUsers);

// @router POST /api/admin/users
// @desc Post user (Admin only)
// access Private/Admin
router.post("/", protect, isAdmin, createUser);


// @router PUT /api/admin/users/:id
// @desc Put user (Admin only)
// access Private/Admin
router.put("/:id", protect, isAdmin, updateUser);


// @router DELETE /api/admin/users/:id
// @desc Delete user (Admin only)
// access Private/Admin
router.delete("/:id", protect, isAdmin, deleteUser);

module.exports = router;
