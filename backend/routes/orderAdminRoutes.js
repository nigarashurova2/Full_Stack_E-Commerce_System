const express = require("express");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const {allOrdersForAdmin, updateOrderForAdmin, deleteOrderForAdmin} = require("../controllers/orderController");

const router = express.Router();


// @route GET /api/admin/orders
// @desc Get all orders
// @access Private Admin
router.get("/", protect, isAdmin, allOrdersForAdmin);


// @route PUT /api/admin/orders/:id
// @desc Put all orders
// @access Private Admin
router.put("/:id", protect, isAdmin, updateOrderForAdmin);


// @route DELETE /api/admin/orders/:id
// @desc Delete a order
// @access Private Admin
router.delete("/:id", protect, isAdmin, deleteOrderForAdmin);

module.exports = router;