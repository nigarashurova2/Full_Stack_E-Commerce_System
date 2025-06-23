const express = require("express");
const Product = require("../models/productModel");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const { createProduct, updateProduct, deleteProduct } = require("../controllers/productController");

const router = express.Router();

// @route POST /api/products
// @desc a new Product
// @access Private/Admin
router.post("/", protect, isAdmin, createProduct);

// @route PUT /api/products/:id
// @desc update a Product
// @access Private/Admin
router.put("/:id", protect, isAdmin, updateProduct)

// @route DELETE /api/products/:id
// @desc delete a Product
// @access Private/Admin
router.delete("/:id", protect, isAdmin, deleteProduct)

module.exports = router;