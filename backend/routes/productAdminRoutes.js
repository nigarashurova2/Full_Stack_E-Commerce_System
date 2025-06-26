const express = require("express");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const {getAllProducts} = require("../controllers/productController");

const router = express.Router();


// @route GET /api/admin/products
// @desc Get all products
// @access Private Admin
router.get("/", protect, isAdmin, getAllProducts);

module.exports = router;