const express = require("express");
const router = express.Router();
const { userFeedback,getAllFeedback, deleteFeedback } = require("../Controllers/feedbackController");
const { isUserLogin, isAdminLogin } = require("../Middlewares/authMiddleware");

router.post("/feedback", userFeedback);
router.get("/feedbacks", isAdminLogin, getAllFeedback);
router.delete("/:id", isAdminLogin, deleteFeedback);

module.exports = router;