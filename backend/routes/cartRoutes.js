const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addToCart, updateProductQuantity, deleteCartProduct, getCartData, mergeCartInLogin } = require("../controllers/cartController");

const router = express.Router();

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged in user
// @access Public
router.post("/", addToCart);

// @route PUT /api/cart
// @ desc Update product quantity in the cart for a guest or logged-in user
// @access Public
router.put("/", updateProductQuantity);

// @route DELETE /api/cart
// @ desc Delete cart product 
// @access Public
router.delete("/", deleteCartProduct);

// @route GET /api/cart
// @desc GET cart  
// @access Public
router.get("/", getCartData);


// @route POST /api/cart/merge
// @desc Merge guest cart into user cart on login
// @access Private
router.post("/merge", protect, mergeCartInLogin);

module.exports = router;
