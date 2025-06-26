const Checkout = require("../models/checkoutModel");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

const createCheckout = async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }

  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    res.status(201).json(newCheckout);
  } catch (error) {
    console.log("Error Creating checkout session: ", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const payCheckout = async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout)
      return res.status(404).json({ message: "Checkout not found" });
    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();
      return res.status(200).json(checkout);
    } else {
      return res.status(400).json({ message: "Invalid Payment Status" });
    }
  } catch (error) {
    console.log("Error Payment checkout session: ", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const finalizeCheckout = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout)
      return res.status(404).json({ message: "Checkout not found" });

    if (checkout.isPaid && !checkout.isFinalized) {
      const order = await Order.create({
        user: checkout.user,
        orderItems: checkout.orderItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      await Cart.findOneAndDelete({ user: checkout.user });
      return res.status(201).json(order);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: "Checkout already finalized" });
    } else {
      res.status(400).json({ message: "Checkout is not paid" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createCheckout, payCheckout, finalizeCheckout };
