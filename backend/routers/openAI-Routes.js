const express = require("express");
const { chatDeepSeek } = require("../controllers/openAI");
const router = express.Router();

router.post("/", chatDeepSeek);

module.exports = router;
