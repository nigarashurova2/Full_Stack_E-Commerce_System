const mongoose = require("mongoose");
const Product = require("./models/productModel");
const User = require("./models/userModel");
const Cart = require("./models/cartModel");
const dotenv = require("dotenv");
const products = require("./data/products");

dotenv.config();

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to seed data
const seedData = async () => {
  try {
    // clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    const userId = createdUser._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: userId };
    });

    // insert the products into the database
    await Product.insertMany(sampleProducts);

    console.log("Product data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding the data:", error);
    process.exit(1);
  }
};

seedData();
