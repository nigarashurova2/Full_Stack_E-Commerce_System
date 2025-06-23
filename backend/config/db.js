const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb connected succesfully");
  } catch (error) {
    console.error("MongoDb connection failed", error);
    process.exit(1)
  }
};

module.exports = connectDB;
