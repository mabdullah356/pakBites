const mongoose = require("mongoose");
require("dotenv").config();

let connectionPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not defined in environment variables");
  }

  console.log("Mongo URI loaded:", !!process.env.MONGO_URL);

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URL, {
        serverSelectionTimeoutMS: 5000,
      })
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  }

  await connectionPromise;
  console.log("Database connected successfully.");
  return mongoose;
};

const ensureDbConnected = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    const error = new Error("Database is not connected");
    error.status = 503;
    return next(error);
  }
  next();
};

module.exports = connectDB;
module.exports.ensureDbConnected = ensureDbConnected;
