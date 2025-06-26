const Subscriber = require("../models/subscriberModel");

const createSubscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      return res.status(400).json({ message: "Subscriber is required" });
    }

    subscriber = new Subscriber({ email });
    await subscriber.save();
    res
      .status(201)
      .json({ message: "Successfuly subscribed to the newsletter!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createSubscribe,
};
