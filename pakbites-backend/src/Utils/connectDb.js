const mongoose = require("mongoose");
require("dotenv").config();

// Cache on globalThis so the connection persists across serverless invocations (Vercel)
const cache = (globalThis.__mongoCache = globalThis.__mongoCache || { promise: null });

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not defined in environment variables");
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(process.env.MONGO_URL, {
        serverSelectionTimeoutMS: 8000,
      })
      .catch((error) => {
        cache.promise = null;
        throw error;
      });
  }

  await cache.promise;
  console.log("Database connected successfully.");
  return mongoose;
};

const ensureDbConnected = async (req, res, next) => {
  try {
    await connectDB();
  } catch (error) {
    error.status = 503;
    return next(error);
  }
  next();
};

module.exports = connectDB;
module.exports.ensureDbConnected = ensureDbConnected;
