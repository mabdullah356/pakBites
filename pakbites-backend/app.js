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

//health route
app.get("/health",(req, res)=>{
  return res.status(200).json({
    status: "success",
    message: "Server is healthy and running"
  })
})

const connectDB = require("./src/Utils/connectDb");
const { ensureDbConnected } = connectDB;

connectDB().catch((error) => {
  console.error("Database connection failed:", error.message);
});

//importing all routes--
const userRoutes = require("./src/Routes/userRoutes");
const foodItemRoutes = require("./src/Routes/foodItemsRoutes");
const orderRoutes = require("./src/Routes/orderRoutes");
const userFeedbackRoutes = require("./src/Routes/feedbackRoutes");
const salesRoutes = require("./src/Routes/salesRoute");

app.use(ensureDbConnected);

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
