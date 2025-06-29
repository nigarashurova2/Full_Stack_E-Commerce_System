const express = require("express");
const Product = require("../models/productModel");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const {
  createProduct,
  getProductsWithQuery,
  getProductById,
  getSimilarProducts,
  getBestSellerProduct,
  newArrivalsProducts,
} = require("../controllers/productController");

const router = express.Router();

// @route POST /api/products
// @desc a new Product
// @access Private/Admin
router.post("/", protect, isAdmin, createProduct);



// @route GET /api/products
// @desc Get all products with optional query filters
// @access Public
router.get("/", getProductsWithQuery);

// @route GET /api/products/newArrivals
// @desc Retrieve latest 8 products - Creation date
// @access Public
router.get(`/newArrivals`, newArrivalsProducts);

// @route GET /api/products/bestSeller
// @desc Retrieve the product with highest rating
// @access Public
router.get("/bestSeller", getBestSellerProduct);


// @route GET /api/products/similar/:id
// @desc Retrieve similar products based on the current product's gender and category
// @access Public
router.get("/similar/:id", getSimilarProducts);


// @route GET /api/products/:id
// @desc Get a single product by ID
// @access Public
router.get("/:id", getProductById);





module.exports = router;
