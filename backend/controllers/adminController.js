const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    console.log(user, "user");
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
      role: role || "customer",
    });
    await user.save();
    return res.status(201).json({ message: "User created succesfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.customer = req.body.customer || user.customer;

      const updateUser = await user.save();

      res.json({ message: "User updated successfully", user: updateUser });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: "User deleted successfuly" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
