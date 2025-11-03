const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { generateInsights, chatWithAI } = require("../controllers/aiController");

router.route("/insights/:fileId")
  .get(protect, generateInsights)
  .post(protect, generateInsights);

router.post("/chat", chatWithAI);

module.exports = router;
