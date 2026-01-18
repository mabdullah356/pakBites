const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  console.log("Mongo URI loaded:", !!process.env.MONGO_URL);
  try {
    await mongoose.connect(process.env.MONGO_URL, {
  serverSelectionTimeoutMS: 5000,
});
    console.log("Database connected successfully.");
  } catch (error) {
    // console.log(error)
    console.error("Database connection failed:", error);
      // process.exit(1);
  }
};

module.exports = connectDB;
