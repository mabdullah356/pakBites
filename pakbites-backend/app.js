const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cors({
  origin: 'https://pak-bites.vercel.app/',
  credentials: true
}));
app.use(cookieParser());

//importing all routes--
const userRoutes = require("./src/Routes/userRoutes");
const foodItemRoutes = require("./src/Routes/foodItemsRoutes");
const orderRoutes = require("./src/Routes/orderRoutes");
const userFeedbackRoutes = require("./src/Routes/feedbackRoutes");
const salesRoutes = require("./src/Routes/salesRoute");

app.use("/api/v1/foodItems", foodItemRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/feedback", userFeedbackRoutes);
app.use("/api/v1/sales", salesRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("--- Global Error Triggered ---");
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);

  const status = err.status || 500;
  const message = err.message || "An internal server error occurred";

  res.status(status).json({
    success: false,
    message: String(message),
  });
});

module.exports = app;
