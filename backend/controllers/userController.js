const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Registration logic
    let user = await User.findOne({ email });
    if (user) res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, password });
    user.save();

    // Create JWT Payload
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    // Sign and return thr token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "40h",
      },
      (err, token) => {
        if (err) throw err;

        // send the user and token on response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) res.status(400).json({ message: "User not found!" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Create JWT Payload
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    // Sign and return thr token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "40h",
      },
      (err, token) => {
        if (err) throw err;

        // send the user and token on response
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

const profile = async (req, res) => {
    res.send(req.user)
};

module.exports = {
  register,
  login,
  profile
};
