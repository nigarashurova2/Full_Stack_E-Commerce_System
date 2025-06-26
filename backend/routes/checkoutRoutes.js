const express = require("express");
const { createCheckout, payCheckout, finalizeCheckout } = require("../controllers/checkoutController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST /api/checkout
// @desc Create a new checkout session
// @access Private
router.post("/", protect, createCheckout);


// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Private
router.put("/:id/pay", protect, payCheckout);


// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment confirmation
// @access Private
router.post("/:id/finalize", protect, finalizeCheckout);

module.exports = router;
