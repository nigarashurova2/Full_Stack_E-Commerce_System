const express = require("express");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const {getAllProducts, deleteProduct} = require("../controllers/productController");

const router = express.Router();


// @route GET /api/admin/products
// @desc Get all products
// @access Private Admin
router.get("/", protect, isAdmin, getAllProducts);

// @route DELETE /api/admin/products/:id
// @desc delete a Product
// @access Private/Admin
router.delete("/:id", protect, isAdmin, deleteProduct);

module.exports = router;