const express = require("express");
const {getAllSales } = require("../Controllers/salesController");
const router = express.Router();
const { isAdminLogin } = require("../Middlewares/authMiddleware");

router.get("/sales", isAdminLogin, getAllSales);


module.exports = router;