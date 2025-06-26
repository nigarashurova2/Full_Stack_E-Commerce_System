const express = require("express");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const {getOrders, getOrderDetail, allOrders} = require("../controllers/orderController");
const router = express.Router();

// @route GET /api/orders/my-orders
// @desc Get logged-in user's orders
// @access Private
router.get("/my-orders", protect, getOrders)


// @route GET /api/orders/:id
// @desc Get logged-in user's orders
// @access Private
router.get("/:id", protect, getOrderDetail)

module.exports = router;