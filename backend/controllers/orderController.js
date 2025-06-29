const Order = require("../models/orderModel");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getOrderDetail = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const allOrdersForAdmin = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({
        createdAt: -1,
      })
      .populate("user", "name email");

    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const updateOrderForAdmin = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findById(req.params.id).populate("user", "name");

    if (order) {
      order.status = status || order.status;
      order.isDelivered = status === "Delivered" ? true : order.isDelivered;
      order.deliveredAt =
        status === "Delivered" ? Date.now() : order.deliveredAt;

      const updateOrder = await order.save();
      return res.json(updateOrder);
    } else {
      if (!order) return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const deleteOrderForAdmin = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      await order.deleteOne();
      res.json({ message: "Order removed" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getOrders,
  getOrderDetail,
  allOrdersForAdmin,
  updateOrderForAdmin,
  deleteOrderForAdmin,
};
