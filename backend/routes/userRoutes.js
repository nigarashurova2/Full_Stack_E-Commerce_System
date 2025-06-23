const express = require("express");
const {register, login, profile} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//  @route POST /api/users/register
//  @desc Register a new user
//  @access Public
router.post("/register", register)


// @route POST /api/users/login
// @desc Authenticate user
// @access Public
router.post("/login", login)


// @route GET /api/users/profile
// @desc Get logged-in user's profile (Protected Route)
// @access Private
router.get("/profile", protect, profile)


module.exports = router;