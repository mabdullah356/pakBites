const express = require("express");
const router = express.Router();
const { isUserLogin, isAdminLogin } = require("../Middlewares/authMiddleware");
const {login, register, logout,verifyOtp, getProfile, getAllUsers, deleteUser, updateUser } = require("../Controllers/userController");

router.post("/login", login);
router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.get("/logout", isUserLogin,logout);
router.get("/get-profile", isUserLogin, getProfile);
router.get("/users", isAdminLogin, getAllUsers);
router.delete("/:id", isAdminLogin, deleteUser);
router.put("/:id", isAdminLogin, updateUser);

module.exports = router;
