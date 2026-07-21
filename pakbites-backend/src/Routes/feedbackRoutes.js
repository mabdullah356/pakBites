const express = require("express");
const router = express.Router();
const { userFeedback, getAllFeedback, deleteFeedback } = require("../Controllers/feedbackController");
const { isUserLogin, isAdminLogin } = require("../Middlewares/authMiddleware");

router.post("/", isUserLogin, userFeedback);
router.get("/", isAdminLogin, getAllFeedback);
router.delete("/:id", isAdminLogin, deleteFeedback);

module.exports = router;
